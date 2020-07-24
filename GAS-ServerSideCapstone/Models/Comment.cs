using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GAS_ServerSideCapstone.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public int ItemId { get; set; }

        public Item Item { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

    }
}
