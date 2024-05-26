"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
var subBtn = document.querySelector("#submitBtn");
var main = document.querySelector("main");
var sort = document.querySelector("#sort");
var addBtn = document.querySelector("#addBtn");
var Book = /** @class */ (function () {
    function Book(title, author, pages, read) {
        this.title = title.trim();
        this.author = author.trim();
        this.pages = +pages;
        this.read = read ? "Finished" : "Not Finished";
    }
    return Book;
}());
var Library = /** @class */ (function () {
    function Library() {
        this.library = [];
    }
    Library.prototype.addBook = function (book) {
        this.library.push(book);
    };
    Library.prototype.removeBook = function (title) {
        this.library = this.library.filter(function (book) { return book.title !== title; });
    };
    Library.prototype.displayBooks = function () {
        var _this = this;
        if (main && addBtn) {
            main.innerHTML = "";
            this.library.forEach(function (book) {
                var div = document.createElement("div");
                div.className = "book";
                div.innerHTML = "\n          <h3>".concat(book.title, "</h3>\n          <p>").concat(book.author, "</p>\n          <p>Pages: ").concat(book.pages, "</p>\n          <p class=\"readStatus\">").concat(book.read, "</p>\n          <button class=\"removeBtn\">Remove</button>\n          ");
                var removeBtn = div.querySelector(".removeBtn");
                removeBtn === null || removeBtn === void 0 ? void 0 : removeBtn.addEventListener("click", function () {
                    _this.removeBook(book.title);
                    _this.displayBooks();
                });
                var readStatus = div.querySelector(".readStatus");
                readStatus === null || readStatus === void 0 ? void 0 : readStatus.addEventListener("click", function () {
                    readStatus.innerHTML =
                        readStatus.innerHTML === "Finished" ? "Not Finished" : "Finished";
                    book.read = readStatus.innerHTML;
                    div.classList.toggle("bookRead");
                });
                main.append(div, addBtn);
            });
        }
    };
    Library.prototype.createPopUp = function () {
        var _a, _b, _c, _d;
        var div = document.createElement("div");
        div.id = "popUp";
        div.innerHTML = "\n      <form method=\"#\" class=\"addBookDiv\">\n                <label for=\"popUpauthor\">Author</label>\n                <input type=\"text\" id=\"popUpAuthor\" name=\"author\">\n                <label for=\"popUpTitel\">Title</label>\n                <input type=\"text\" id=\"popUpTitle\" name=\"title\">\n                <label for=\"popUppages\">Pages</label>\n                <input type=\"number\" id=\"popUpPages\" name=\"pages\">\n                <div class=\"readCheck\">\n                    <label for=\"popUpread\">read?</label>\n                    <input type=\"checkbox\" name=\"read\" id=\"popUpRead\">\n                </div>\n                <button id=\"subPopUp\">Submit</button>\n                <button id=\"cancelPopUp\">Cancel</button>\n            </form>\n    ";
        var body = document.querySelector("body");
        body === null || body === void 0 ? void 0 : body.append(div);
        var title = ((_a = div.querySelector("#popUpTitel")) === null || _a === void 0 ? void 0 : _a.value) ||
            "Unknown title";
        var author = ((_b = div.querySelector("#popUpAuthor")) === null || _b === void 0 ? void 0 : _b.value) ||
            "Unknown author";
        var pages = ((_c = div.querySelector("#popUpPages")) === null || _c === void 0 ? void 0 : _c.value) || "0";
        var read = ((_d = div.querySelector("#popUpRead")) === null || _d === void 0 ? void 0 : _d.checked) || false;
        var subBtn = div.querySelector("#subPopUp");
        var cancel = div.querySelector("#cancelPopUp");
        if (subBtn)
            subBtn.addEventListener("click", function () {
                var book = new Book(title, author, pages, read);
                library.addBook(book);
                library.displayBooks();
                div.remove();
            });
        if (cancel)
            cancel.addEventListener("click", function () {
                div.remove();
            });
    };
    Library.prototype.sortBooks = function (criteria) {
        if (criteria === "title") {
            this.library.sort(function (a, b) { return (a.title > b.title ? 1 : -1); });
        }
        else if (criteria === "author") {
            this.library.sort(function (a, b) { return (a.author > b.author ? 1 : -1); });
        }
        else if (criteria === "pages") {
            this.library.sort(function (a, b) { return a.pages - b.pages; });
        }
        this.displayBooks();
    };
    Library.prototype.test = function (num) {
        var abc = [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
        ];
        function rdmString() {
            var str = "";
            for (var i = 0; i < 9; i++) {
                var rdmNum = Math.floor(Math.random() * abc.length);
                str += abc[rdmNum];
            }
            return str;
        }
        for (var i = 0; i < num; i++) {
            var author = rdmString();
            var title = rdmString();
            var pages = Math.floor(Math.random() * 100);
            var read = pages % 2 === 0;
            var book = new Book(author, title, pages, read);
            library.addBook(book);
        }
        library.displayBooks();
    };
    return Library;
}());
var library = new Library();
window.library = library;
if (subBtn && main && sort && addBtn) {
    var title_1 = ((_a = document.querySelector("#title")) === null || _a === void 0 ? void 0 : _a.value) ||
        "Unknown Title";
    var author_1 = ((_b = document.querySelector("#author")) === null || _b === void 0 ? void 0 : _b.value) ||
        "Unknown Author";
    var pages_1 = ((_c = document.querySelector("#pages")) === null || _c === void 0 ? void 0 : _c.value) || "0";
    var read_1 = ((_d = document.querySelector("#read")) === null || _d === void 0 ? void 0 : _d.checked) || false;
    subBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var book = new Book(title_1, author_1, pages_1, read_1);
        library.addBook(book);
        library.displayBooks();
    });
    sort.addEventListener("change", function () {
        library.sortBooks(sort.value);
    });
    addBtn.addEventListener("click", function () {
        library.createPopUp();
    });
}
