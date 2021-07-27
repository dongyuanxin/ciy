#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// 参考教程：
// 1、《C语言位域（位段）详解》http://c.biancheng.net/view/2037.html

// 有些时候不需要完整字节，数据占用位数是提前指定的。比如 1 个bit、2 个bit。
// c 支持声明属性实际所占位，这种结构是位域。

// 声明方法：type value_name: bit_length;
// 注意：bit_length 大小应该小于等于 type 所占空间。比如char（一个字节）的位域就不能超过 4(bit)
struct Bs
{
    unsigned m;
    unsigned n : 4;
    unsigned char ch : 6;
};

int main(void)
{
    struct Bs bs = {0xad, 0xE, '$'};
    // 输出是：0xad, 0xe, $
    printf("%#x, %#x, %c\n", bs.m, bs.n, bs.ch);
    return 0;
}