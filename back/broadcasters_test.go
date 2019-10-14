package main

import (
	pb "github.com/alexeyShumakov/simplechat/back/proto"
	"testing"
)

func TestMessageBroadcaster_Add(t *testing.T) {
	broadcaster := MessageBroadcaster{}
	listener := make(chan pb.Message)
	broadcaster.Add(1, listener)
	if broadcaster.listeners[1] != listener {
		t.Error("invalid listener")
	}
}

func TestMessageBroadcaster_Remove(t *testing.T) {
	broadcaster := MessageBroadcaster{}
	listener := make(chan pb.Message)
	broadcaster.Add(1, listener)
	broadcaster.Remove(1)
	if len(broadcaster.listeners) != 0 {
		t.Error("remove error")
	}
}

func TestCounterBroadcaster_Broadcast(t *testing.T) {
	broadcaster := MessageBroadcaster{}
	listener := make(chan pb.Message)
	message := pb.Message{Value: "value"}
	broadcaster.Add(1, listener)
	go func() {
		expectedMessage := <-listener
		if expectedMessage.Value != message.Value {
			t.Errorf("broadcast expect %s got %s", expectedMessage.Value, message.Value)
		}
	}()
	broadcaster.Broadcast(message)
}
