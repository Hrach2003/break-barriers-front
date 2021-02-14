import { Role } from './role.enum'

export interface IMessage {
  text: string
  type: Role
  date: Date
  error?: string
}
