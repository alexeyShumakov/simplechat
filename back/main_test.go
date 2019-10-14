package main

import (
	"context"
	pb "github.com/alexeyShumakov/simplechat/back/proto"
	"testing"
)

func TestServer_CreateMessage(t *testing.T) {

	t.Run("default behaviour", func(t *testing.T) {
		s := server{}
		req := &pb.Message{Value: "hello", UserName: "bob", Created: "2018-10-02T15:00:00.05Z"}
		_, err := s.CreateMessage(context.Background(), req)
		if err != nil {
			t.Error("TestServer_CreateMessage got unexpected error")
		}
		if s.totalMessages != 1 {
			t.Error("total messages not incremented")
		}
	})

	t.Run("validation error", func(t *testing.T) {
		s := server{}
		req := &pb.Message{Value: "hello", UserName: "!bob", Created: "2018-10-02T15:00:00.05Z"}
		_, err := s.CreateMessage(context.Background(), req)
		if err == nil {
			t.Error("TestServer_CreateMessage must have validation error")
		}
	})
}
