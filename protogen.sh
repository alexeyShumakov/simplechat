export GOBIN="$GOPATH/bin"
protoc \
  --plugin=protoc-gen-ts=./front/node_modules/.bin/protoc-gen-ts \
  --plugin=protoc-gen-go=${GOBIN}/protoc-gen-go \
  -I ./proto \
  --js_out=import_style=commonjs,binary:./front/src/app/proto \
  --go_out=plugins=grpc:./back/proto \
  --ts_out=service=grpc-web:./front/src/app/proto \
  ./proto/chat.proto