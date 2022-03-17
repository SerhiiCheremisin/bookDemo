export interface bookItem {
    id :number,
    title :string,
    author: string,
    category:string,
    ISBN: string,
}

export interface bookState {
    editedBook: number,
    books : bookItem[]
}