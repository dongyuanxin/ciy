#include <stdio.h>
#include <float.h>
// 指针数组
// 指针组成的数组。数组中的每个元素是一个指针。

const int MAX_LENGTH = 3;

int main()
{
    int var[] = {10, 100, 200};
    // 声明长度为3的指针数组，除了前面的 int*，其他和普通数组声明一样
    int *ptr[MAX_LENGTH];
    for (int i = 0; i < MAX_LENGTH; ++i)
    {
        ptr[i] = &var[i]; // 每个元素都是一个地址
    }
    for (int i = 0; i < MAX_LENGTH; ++i)
    {
        printf("var[%d] is %d\n", i, *ptr[i]);
    }
    return 0;
}