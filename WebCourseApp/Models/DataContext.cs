using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebCourseApp.Models
{
    public class DataContext : IdentityDbContext<User>
    {
        //public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        { }
    }
}
