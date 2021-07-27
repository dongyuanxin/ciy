#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// 另一种定义方法，使用 typedef 来定义
typedef struct Author
{
    char name[50];
    int age;
} Author;

// 另一种定义方法，定义+初始化变量
struct Demo
{
    char title[50];
    int id;
} demo = {"demo", 1};

// 定义结构体
// 结构体可以嵌套其他结构体，从而形成复杂结构。类似 typescript/java 中 interface
struct Book
{
    char title[50];
    int book_id;
    struct Author *author;
};

// 访问属性 1 ：如果是指针，通过 -> 语法
void print_book(struct Book *book)
{
    printf("author age is %s\n", book->author->name);
}

int main(void)
{
    struct Author author;
    author.age = 10;
    // author.name = "dyx"; // 报错。char[]不是可修改的左值
    strcpy(author.name, "dyx");

    // 访问属性 2 ：如果不是指针，通过 . 语法
    struct Book book;
    book.book_id = 0;
    book.author = &author;
    strcpy(author.name, "demo book");

    print_book(&book);

    return 0;
}