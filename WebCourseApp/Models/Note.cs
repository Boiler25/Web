using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebCourseApp.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string UserId { get; set; }
        public User user { get; set; }
    }
}
