#include <stdio.h>
#include <fcntl.h>
#include <utmp.h>
#include <unistd.h>

#define SHOWHOST

void show_info(struct utmp *utbufp);

int main(int argc, char *argv[])
{
    int fd;
    //打开utmp文件，UTMP_FILE定义在utmp.h中，指示了文件路径
    if ((fd = open(UTMP_FILE, O_RDONLY)) == -1)
    {
        return 1;
    }
    struct utmp current_record;
    int reclen = sizeof(current_record);
    //循环读取utmp文件中结构体数组中的每一个结构体并解析处理
    while (read(fd, &current_record, reclen) == reclen)
    {
        show_info(&current_record);
    }
    close(fd);
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