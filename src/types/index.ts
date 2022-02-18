export interface bookItem {
    id :number,
    title :string,
    author: string,
    category:string,
    ISBN: number,
}

export interface bookState {
    editedBook: number,
    books : bookItem[]
}