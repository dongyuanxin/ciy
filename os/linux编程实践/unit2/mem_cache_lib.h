#include <stdio.h>
#include <fcntl.h>
#include <sys/types.h>
#include <utmp.h>
#include <unistd.h>

#define NRECS 16                     // 缓冲区中结构数量上限
#define UTSIZE (sizeof(struct utmp)) // 每个utmp结构的大小
#define NULLUT ((struct utmp *)NULL) // 空的 utmp 指针

static char utmpbuf[NRECS * UTSIZE]; // 缓冲区。一个char对应一个字节
static int num_recs;                 // 目前缓冲区中的结构数量，它小于等于 NRECS。因为utmp中结构数量不一定是NRECS整数
static int cur_rec;                  // 缓冲区消费标记。当从缓冲区读取结构之后，会自增。一直到num_recs，代表缓冲区都被读取完成了，需要重新将数据刷入缓冲区。
static int fd_utmp = -1;

// 打开 utmp 文件
int utmp_open(char *filename)
{
    fd_utmp = open(filename, O_RDONLY);
    cur_rec = num_recs = 0;
    return fd_utmp;
}

// 关闭 utmp 文件
void utmp_close()
{
    if (fd_utmp != -1)
    {
        close(fd_utmp);
    }
}

// 向内存缓冲区加载utmp内容
int utmp_reload()
{
    int amt_read = read(fd_utmp, utmpbuf, NRECS * UTSIZE);
    num_recs = amt_read / UTSIZE; // 本次读取到的结构数量
    cur_rec = 0;                  // 重置读取标记位
    return num_recs;
}

// 读取内存缓冲区中的下一个结构
struct utmp *utmp_next()
{
    struct utmp *recp;
    if (fd_utmp == -1)
    {
        return NULLUT;
    }
    // 如果缓冲区已经被读取完，那么尝试加载新数据到缓冲区
    // 如果加载的数据大小也为空，那么说明都读取完了
    if (cur_rec == num_recs && utmp_reload() == 0)
    {
        return NULLUT;
    }
    // 取出 [cur_rec * UTSIZE, (cur_rec + 1) * UTSIZE] 中的数据结构化
    recp = (struct utmp *)&utmpbuf[cur_rec * UTSIZE];
    cur_rec++;
    return recp;
}
