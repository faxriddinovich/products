export async function getItems(){
    const apiKey='AIzaSyBwEQtFSfWSvtoj5iitzw9qUnlFOgUCe-A',query = 'most popular books'
    let res;
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => { res=data.items })
        .catch(error => console.error('Error fetching the books:', error));
    return res;
}

export async function getCurrentBook(id){
    let currentBook;
    await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then(response => response.json())
        .then(data => currentBook = data)
        .catch(error => console.error('Error:', error));
    return currentBook;
}