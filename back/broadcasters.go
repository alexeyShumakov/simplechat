package main

import (
	pb "github.com/alexeyShumakov/simplechat/back/proto"
	"sync"
)

type MessageBroadcaster struct {
	listenerMu sync.RWMutex
	listeners  map[int]chan<- pb.Message
}

func (b *MessageBroadcaster) Add(id int, listener chan<- pb.Message) {
	b.listenerMu.Lock()
	defer b.listenerMu.Unlock()
	if b.listeners == nil {
		b.listeners = map[int]chan<- pb.Message{}
	}
	b.listeners[id] = listener
}

func (b *MessageBroadcaster) Broadcast(msg pb.Message) {
	for _, listener := range b.listeners {
		listener <- msg
	}
}

func (b *MessageBroadcaster) Remove(id int) {
	b.listenerMu.Lock()
	defer b.listenerMu.Unlock()
	if c, ok := b.listeners[id]; ok {
		close(c)
		delete(b.listeners, id)
	}
}

type CounterBroadcaster struct {
	listenerMu sync.RWMutex
	listeners  map[int]chan<- string
}

func (b *CounterBroadcaster) Add(id int, listener chan<- string) {
	b.listenerMu.Lock()
	defer b.listenerMu.Unlock()
	if b.listeners == nil {
		b.listeners = map[int]chan<- string{}
	}
	b.listeners[id] = listener
}

func (b *CounterBroadcaster) Broadcast(msg string) {
	for _, listener := range b.listeners {
		listener <- msg
	}
}

func (b *CounterBroadcaster) Remove(id int) {
	b.listenerMu.Lock()
	defer b.listenerMu.Unlock()
	if c, ok := b.listeners[id]; ok {
		close(c)
		delete(b.listeners, id)
	}
}
