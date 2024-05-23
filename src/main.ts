import "./style.css";

const subBtn = document.querySelector<HTMLButtonElement>("#submitBtn");
const main = document.querySelector<HTMLDivElement>("main");
const sort = document.querySelector<HTMLSelectElement>("#sort");

class Book {
  title: string;
  author: string;
  pages: number;

  constructor(
    title: string,
    author: string,
    pages: string,
  ) {
    this.title = title.trim() || "Unknown Title";
    this.author = author.trim() || "Unknown Author";
    this.pages = +pages || 0;
  }
}


class Library {
  library: Book[] = [];

  addBook(book: Book) {
    this.library.push(book);
  }

  removeBook(title: string) {
    this.library = this.library.filter(book => book.title !== title);
  }

  displayBooks() {
    if (main) {
      main.innerHTML = '';

      this.library.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book';
        div.innerHTML = `
          <h2>${book.title}</h2>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <button class="removeBtn">Remove</button>
        `;
        main.append(div);

        const removeBtn = div.querySelector<HTMLButtonElement>(".removeBtn");
        if (removeBtn) {
          removeBtn.addEventListener('click', () => {
            this.removeBook(book.title);
            this.displayBooks();
          });
        }
      });
    }
  }

  sortBooks(criteria: string) {
    if (criteria === "title") {
      this.library.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (criteria === "author") {
      this.library.sort((a, b) => (a.author > b.author ? 1 : -1));
    } else if (criteria === "pages") {
      this.library.sort((a, b) => a.pages - b.pages);
    }
    this.displayBooks();
  }
}


const library  = new Library()


if(subBtn && main && sort){

  subBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const title = document.querySelector<HTMLInputElement>("#title")?.value
    const author = document.querySelector<HTMLInputElement>("#author")?.value
    const pages = document.querySelector<HTMLInputElement>("#pages")?.value;
    

      
          const book = new Book(title,author,pages)
      
          library.addBook(book)
          library.displayBooks()



  })

  sort.addEventListener('change', () => {

    library.sortBooks(sort.value)

  })




}