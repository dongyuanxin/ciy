#include <stdio.h>
#include <fcntl.h>
#include <utmp.h>
#include <unistd.h>
#include "./mem_cache_lib.h"
#define SHOWHOST

void show_info(struct utmp *utbufp);

int main(int argc, char *argv[])
{
    struct utmp *utbufp;

    if (utmp_open(UTMP_FILE) == -1)
    {
        perror(UTMP_FILE);
        return -1;
    }

    while ((utbufp = utmp_next()) != NULLUT)
    {
        show_info(utbufp);
    }
    utmp_close();
    return 0;
}

//展示读取到的utmp结构体
void show_info(struct utmp *utbufp)
{
    if (utbufp->ut_type != USER_PROCESS)
    {
        return;
    }
    //用户名
    printf("% -8.8s", utbufp->ut_name);
    printf(" ");
    //终端名
    printf("% -8.8s", utbufp->ut_line);
    printf(" ");
    //登录时间
    printf("% 10ld", utbufp->ut_time);
    printf(" ");
#ifdef SHOWHOST
    //远程主机名
    printf("( %s)", utbufp->ut_host);
#endif
    printf("\n");
}