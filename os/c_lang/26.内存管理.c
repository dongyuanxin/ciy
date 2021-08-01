#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// C 中的动态内存管理，常见函数：
// 1、void *calloc(int num, int size)：
// 在内存中动态地分配 num 个长度为 size 的连续空间，并将每一个字节都初始化为 0。

// 2、void free(void *address);
// 该函数释放 address 所指向的内存块,释放的是动态分配的内存空间。

// 3、void *malloc(int num);
// 在堆区（重点）分配一块指定大小的内存空间，用来存放数据。这块内存空间在函数执行完成后不会被初始化，它们的值是未知的。
// 注意，默认情况下，函数声明的变量是在栈上的。所以不能返回指针。但是堆上分配的动态内存是可以的。

// 4、void *realloc(void *address, int newsize);
// 该函数重新分配内存，把内存扩展到 newsize。

// 关于返回的空指针：void * 类型表示未确定类型的指针。C、C++ 规定 void * 类型可以通过类型转换强制转换为任何其它类型的指针。

// 几者区别：https://blog.csdn.net/liu0808/article/details/80430615

int main()
{
    char name[100];
    char *description;

    strcpy(name, "Zara Ali");

    /* 动态分配内存 */
    description = (char *)malloc(30 * sizeof(char));
    if (description == NULL)
    {
        fprintf(stderr, "Error - unable to allocate required memory\n");
    }
    else
    {
        strcpy(description, "Zara ali a DPS student.");
    }
    /* 假设您想要存储更大的描述信息 */
    description = (char *)realloc(description, 100 * sizeof(char));
    if (description == NULL)
    {
        fprintf(stderr, "Error - unable to allocate required memory\n");
    }
    else
    {
        strcat(description, "She is in class 10th");
    }

    printf("Name = %s\n", name);
    printf("Description: %s\n", description);

    /* 使用 free() 函数释放内存 */
    free(description);
}