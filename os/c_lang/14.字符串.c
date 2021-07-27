#include <stdlib.h>
#include <stdio.h>

// 在 C 语言中，字符串实际上是使用 null 字符 \0 终止的一维字符数组。
// 可以用这个判断字符串结束

int main(void)
{
    // 声明方法 1
    char site1[7] = {'R', 'U', 'N', 'O', 'O', 'B', '\0'};

    // 声明方法 2（更推荐）
    // 不需要把 null 字符放在字符串常量的末尾。C 编译器会在初始化数组时，自动把 \0 放在字符串的末尾。
    char site2[] = "RUNOOB";

    return 0;
}