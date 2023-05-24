export type Groups = {
  id: string
  group_name: string
  image: string
  createdAt: string
  group_members: {
    member: Member[]
  }
  group_messages: message[]
}

export type Member = {
  id: string
  first_name: string
  last_name: string
  display_photo: string
}

export type Group = {
  id: string
  group_name: string
  image: string
  createdAt: string
  group_members: {
    member: Member[]
  }
  group_messages: message[]
}

export type message = {
  name: string
  message: string
  createdAt: string
}

export type ChatMessage = {
  name: string
  message: string
  createdAt: string
}

export type Chats = {
  id: string
  contact_1: string
  contact_2: string
  createdAt: string
  user1: {
    id: string
    first_name: string
    last_name: string
    display_photo: string
  }
  user2: {
    id: string
    first_name: string
    last_name: string
    display_photo: string
  }
  chat_messages: ChatMessage[]
}
