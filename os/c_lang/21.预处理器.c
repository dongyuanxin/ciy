#include <stdio.h>

// C 预处理器不是编译器的组成部分，但是它是编译过程中一个单独的步骤。 C 预处理器（C Preprocessor）简写为 CPP。
// 所有的预处理器命令都是以井号（#）开头。它必须是第一个非空字符，

// 参数定义宏
#define MAX(x, y) ((x) > (y) ? (x) : (y))
// 取消已经定义的宏，重新定义
#undef FILE_SIZE
#define FILE_SIZE 42
// #ifdef: 如果定义了宏，则返回true
#ifdef FILE_SIZE
#define MESSAGE "You wish!"
#endif

int main(void)
{
    printf("Max between 20 and 10 is %d\n", MAX(10, 20));
    printf("FILE_SIZE is %d\n", FILE_SIZE);
    return 0;
}