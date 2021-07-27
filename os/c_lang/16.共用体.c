#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// 共用体是一种特殊的数据类型，允许在相同的内存位置存储不同的数据类型。
// 可以定义一个带有多成员的共用体，但是任何时候只能有一个成员带有值。
// 并且共用体的所占大小，取决于成员的最大大小。
union Data
{
    int i;
    float f;
    char str[20];
};

int main(void)
{
    union Data data;
    printf("size of data is %lu\n", sizeof(data)); // 输出是20字节。因为Data中，str[20]的大小最大

    // 给共同体赋值。通过 . 操作符
    data.i = 10;
    data.f = 220.5;
    strcpy(data.str, "C Programming");

    // 读取值。输出是：
    // data.i : 1917853763
    // data.f : 4122360580327794860452759994368.000000
    // data.str : C Programming
    // 只有最后一个值是完整的。因为union本身就是共用内存地址。后赋值的属性已经重新之前的属性了，导致前面的数据读到的有问题。
    printf("data.i : %d\n", data.i);
    printf("data.f : %f\n", data.f);
    printf("data.str : %s\n", data.str);
    return 0;
}