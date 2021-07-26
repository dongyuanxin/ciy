#include <stdio.h>
#include <float.h>
// 指向指针的指针
// 指向指针的指针是一种多级间接寻址的形式，或者说是一个指针「链」。
const int MAX_LENGTH = 3;

int main()
{
    int v;
    int *p1;
    int **p2;

    p1 = &v;
    p2 = &p1;
    v = 100;

    printf("%d, %d, %d\n", v, *p1, *(*p2));

    return 0;
}