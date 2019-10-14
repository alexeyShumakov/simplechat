// package: chat
// file: chat.proto

import * as jspb from "google-protobuf";

export class Message extends jspb.Message {
  getValue(): string;
  setValue(value: string): void;

  getCreated(): string;
  setCreated(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    value: string,
    created: string,
    username: string,
  }
}

export class Counters extends jspb.Message {
  getTotalmessages(): number;
  setTotalmessages(value: number): void;

  getUsersonline(): number;
  setUsersonline(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Counters.AsObject;
  static toObject(includeInstance: boolean, msg: Counters): Counters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Counters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Counters;
  static deserializeBinaryFromReader(message: Counters, reader: jspb.BinaryReader): Counters;
}

export namespace Counters {
  export type AsObject = {
    totalmessages: number,
    usersonline: number,
  }
}

