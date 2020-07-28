using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GAS_ServerSideCapstone.Models
{
    public class Item
    {

        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; } //do these need to be directly under their Ids and do the Ids need to be at the bottom

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool IsForSale { get; set; } //does this need to be booleon? or defined via logic

        public string SalePrice { get; set; }

        [Required]
        public string ImageUrl { get; set; }

     
    }
}
