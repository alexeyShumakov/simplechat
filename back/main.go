package main

import (
	"context"
	"fmt"
	pb "github.com/alexeyShumakov/simplechat/back/proto"
	"github.com/asaskevich/govalidator"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/rs/cors"
	"google.golang.org/grpc"
	"io"
	"log"
	"math/rand"
	"net/http"
)

type MessageValidator struct {
	UserName string `valid:"required,length(1|20),matches((?i)^[a-zа-я0-9]*$)"`
	Value    string `valid:"required,length(1|250)"`
	Created  string `valid:"required,rfc3339"`
}

const (
	port = 9090
)

type server struct {
	messageBroadcaster MessageBroadcaster
	counterBroadcaster CounterBroadcaster
	totalMessages      int32
	usersOnline        int32
}

func (s *server) CreateMessage(ctx context.Context, in *pb.Message) (*pb.Message, error) {
	message := &MessageValidator{
		UserName: in.UserName,
		Value:    in.Value,
		Created:  in.Created,
	}
	_, err := govalidator.ValidateStruct(message)
	if err != nil {
		return nil, err
	}
	s.messageBroadcaster.Broadcast(*in)
	s.totalMessages++
	s.counterBroadcaster.Broadcast(in.GetValue())
	return in, nil
}

func (s *server) GetCounters(srv pb.Messenger_GetCountersServer) error {
	_, err := srv.Recv()

	if err == io.EOF {
		return nil
	}
	if err != nil {
		return err
	}

	id := rand.Int()
	listener := make(chan string)
	s.counterBroadcaster.Add(id, listener)
	s.usersOnline++

	go func() {
		for {
			_, ok := <-listener
			if !ok {
				return
			}
			srv.Send(&pb.Counters{TotalMessages: s.totalMessages, UsersOnline: s.usersOnline})
		}

	}()
	s.counterBroadcaster.Broadcast("")

	<-srv.Context().Done()
	s.counterBroadcaster.Remove(id)
	s.usersOnline--
	s.counterBroadcaster.Broadcast("")
	return nil

}

func (s *server) MessengerChat(srv pb.Messenger_MessengerChatServer) error {
	_, err := srv.Recv()

	if err == io.EOF {
		return nil
	}
	if err != nil {
		return err
	}

	id := rand.Int()
	listener := make(chan pb.Message)
	s.messageBroadcaster.Add(id, listener)

	go func() {
		for {
			msg, ok := <-listener
			if !ok {
				return
			}
			srv.Send(&pb.Message{
				Value:    msg.GetValue(),
				Created:  msg.GetCreated(),
				UserName: msg.GetUserName(),
			})
		}

	}()
	<-srv.Context().Done()
	s.messageBroadcaster.Remove(id)
	return nil
}

func main() {
	s := grpc.NewServer()
	pb.RegisterMessengerServer(s, &server{})

	wrappedServer := grpcweb.WrapServer(s, grpcweb.WithWebsockets(true), grpcweb.WithWebsocketOriginFunc(func(req *http.Request) bool {
		return true
	}))
	handlerFunc := func(resp http.ResponseWriter, req *http.Request) {
		wrappedServer.ServeHTTP(resp, req)
	}

	handler := http.HandlerFunc(handlerFunc)
	handlerCORS := cors.AllowAll().Handler(handler)

	httpServer := http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: handlerCORS,
	}

	log.Printf("Starting server. http port: %d", port)

	if err := httpServer.ListenAndServe(); err != nil {
		log.Fatalf("failed starting http server: %v", err)
	}
}
