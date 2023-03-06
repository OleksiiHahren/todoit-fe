export interface SearchedItemsInterface {
  id: number
  name: string
  type: 'task' | 'project' | 'mark'
  color: string | null
}
