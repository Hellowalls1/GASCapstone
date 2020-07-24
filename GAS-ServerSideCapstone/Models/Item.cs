using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GAS_ServerSideCapstone.Models
{
    public class Item
    {

        public int Id { get; set; }


        public int UserId { get; set; }

        public User User { get; set; }


        public int CategoryId { get; set; }

        public Category Category { get; set; } //do these need to be directly under their Ids and do the Ids need to be at the bottom

        public string Title { get; set; }

        public string Description { get; set; }

        public bit IsForSale { get; set; } //does this need to be booleon? or defined via logic

        public string ImageUrl { get; set; }

     
    }
}
