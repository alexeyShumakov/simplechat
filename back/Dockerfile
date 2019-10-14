FROM golang:1.13.1

RUN go get -u google.golang.org/grpc
RUN go get -u github.com/golang/protobuf/protoc-gen-go
RUN go get -u github.com/improbable-eng/grpc-web/go/grpcweb
RUN go get -u github.com/asaskevich/govalidator
RUN go get -u github.com/rs/cors
EXPOSE 9090

ENV PATH=$PATH:$GOPATH/bin
WORKDIR $GOPATH/src/github.com/alexeyShumakov/simplechat/back/
COPY ./ ./
CMD go run *.go