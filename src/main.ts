import "./style.css";

const subBtn = document.querySelector<HTMLButtonElement>("#submitBtn");
const main = document.querySelector<HTMLDivElement>("main");
const sort = document.querySelector<HTMLSelectElement>("#sort");
const addBtn = document.querySelector<HTMLButtonElement>("#addBtn");

class Book {
  title: string;
  author: string;
  pages: number;
  read: string;

  constructor(title: string, author: string, pages: string, read: boolean) {
    this.title = title.trim();
    this.author = author.trim();
    this.pages = +pages;
    this.read = read ? "Finished" : "Not Finished";
  }
}

class Library {
  library: Book[] = [];

  addBook(book: Book) {
    this.library.push(book);
  }

  removeBook(title: string) {
    this.library = this.library.filter((book) => book.title !== title);
  }

  displayBooks() {
    if (main && addBtn) {
      main.innerHTML = "";

      this.library.forEach((book) => {
        const div = document.createElement("div");
        div.className = "book";

        div.innerHTML = `
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p class="readStatus">${book.read}</p>
          <button class="removeBtn">Remove</button>
          `;

        const removeBtn = div.querySelector<HTMLButtonElement>(".removeBtn");

        removeBtn?.addEventListener("click", () => {
          this.removeBook(book.title);
          this.displayBooks();
        });

        const readStatus =
          div.querySelector<HTMLParagraphElement>(".readStatus");

        readStatus?.addEventListener("click", () => {
          readStatus.innerHTML =
            readStatus.innerHTML === "Finished" ? "Not Finished" : "Finished";
          book.read = readStatus.innerHTML;
          div.classList.toggle("bookRead");
        });

        main.append(div, addBtn);
      });
    }
  }

  createPopUp() {
    const div = document.createElement("div");
    div.id = "popUp";

    div.innerHTML = `
      <form method="#" class="addBookDiv">
                <label for="popUpauthor">Author</label>
                <input type="text" id="popUpAuthor" name="author">
                <label for="popUpTitel">Title</label>
                <input type="text" id="popUpTitle" name="title">
                <label for="popUppages">Pages</label>
                <input type="number" id="popUpPages" name="pages">
                <div class="readCheck">
                    <label for="popUpread">read?</label>
                    <input type="checkbox" name="read" id="popUpRead">
                </div>
                <button id="subPopUp">Submit</button>
                <button id="cancelPopUp">Cancel</button>
            </form>
    `;

    const body = document.querySelector("body");

    body?.append(div);

    const title =
      div.querySelector<HTMLInputElement>("#popUpTitel")?.value ||
      "Unknown titel";
    const author =
      div.querySelector<HTMLInputElement>("#popUpAuthor")?.value ||
      "Unknown author";
    const pages =
      div.querySelector<HTMLInputElement>("#popUpPages")?.value || "0";
    const read =
      div.querySelector<HTMLInputElement>("#popUpRead")?.checked || false;

    const subBtn = div.querySelector<HTMLButtonElement>("#subPopUp");
    const cancel = div.querySelector<HTMLButtonElement>("#cancelPopUp");
    if (subBtn)
      subBtn.addEventListener("click", () => {
        const book = new Book(title, author, pages, read);
        library.addBook(book);
        library.displayBooks();
        div.remove();
      });

    if (cancel)
      cancel.addEventListener("click", () => {
        div.remove();
      });
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

const library = new Library();

if (subBtn && main && sort && addBtn) {
  const title =
    document.querySelector<HTMLInputElement>("#title")?.value ||
    "Unknown Title";
  const author =
    document.querySelector<HTMLInputElement>("#author")?.value ||
    "Unknown Author";
  const pages =
    document.querySelector<HTMLInputElement>("#pages")?.value || "0";
  const read =
    document.querySelector<HTMLInputElement>("#read")?.checked || false;

  subBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const book = new Book(title, author, pages, read);

    library.addBook(book);
    library.displayBooks();
  });

  sort.addEventListener("change", () => {
    library.sortBooks(sort.value);
  });

  addBtn.addEventListener("click", () => {
    library.createPopUp();
  });
}
