#include <stdlib.h>
#include <stdio.h>

// c语言的回调函数，是通过传入函数指针来实现的。

void init_array(int *array, int length, int (*get_next_random_val)(void))
{
    for (int i = 0; i < length; ++i)
    {
        array[i] = get_next_random_val();
    }
}

int get_next_random_val(void)
{
    return rand();
}

int main(void)
{
    int myarray[10];
    init_array(myarray, 10, get_next_random_val);
    for (int i = 0; i < 10; ++i)
    {
        printf("%d ", myarray[i]);
    }
    printf("\n");
    return 0;
}