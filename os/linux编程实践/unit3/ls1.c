#include <stdio.h>
#include <fcntl.h>
#include <sys/types.h>
#include <utmp.h>
#include <unistd.h>
#include <dirent.h>

void do_ls(char *dirname)
{
    DIR *dir_ptr = opendir(dirname);
    struct dirent *dirent_ptr;

    if (dir_ptr == NULL)
    {
        fprintf(stderr, "ls1: cant open %s\n", dirname);
    }
    else
    {
        while ((dirent_ptr = readdir(dir_ptr)) != NULL)
        {
            printf("%s\n", dirent_ptr->d_name);
        }
        closedir(dir_ptr);
    }
}

int main(int argc, char *argv[])
{
    if (argc == 1)
    {
        char ch[] = {'.'};
        do_ls(ch);
        return 0;
    }

    for (int i = 1; i < argc; ++i)
    {
        if (argc > 2)
        {
            printf("%s:\n", argv[i]);
        }
        do_ls(argv[i]);
    }
    return 0;
}