using GAS_ServerSideCapstone.Data;
using GAS_ServerSideCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GAS_ServerSideCapstone.Repositories
{
    public class ItemRepository
    {
        private readonly ApplicationDbContext _context;

        public ItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        //not being used
        public List<Item> GetAll()
        {
            var All = _context.Item.Include(i => i.User)
                                   .Include(i => i.Category)
                              
                                   .OrderByDescending(i => i.Title)
                                   .ToList();
            return All;
        }

        //including the User for user data
        //including the category information for the UI
        //where the booleon is false
        //ordering by title alphabetically
        //listing
        public List<Item> GetAllNotForSale()
        {
            var All = _context.Item.Include(i => i.User)
                                   .Include(i => i.Category)
                                   .Where(i => i.IsForSale == false)
                                   .OrderByDescending(i => i.Title)
                                   .ToList();
            return All;
        }

        //getting the user information
        //getting the category 
        //getting if the item is for sale
        //ordering by the title
        public List<Item> GetAllItemsForSale()
        {
            var All = _context.Item.Include(i => i.User)
                                   .Include(i => i.Category)
                                   .Where(i => i.IsForSale == true)
                                   .OrderByDescending(i => i.Title)
                                   .ToList();
            return All;
        }
        //adding an item
        //my understanding that SaveChanges saves the item to the database after adding
        public void Add(Item item)
        {
            _context.Add(item);
            _context.SaveChanges();
        }

        public Item GetById(int id)
        {
            return _context.Item.Include(i => i.User)
                .Include(i => i.Category)
                .FirstOrDefault(i => i.Id == id);
        }

        //not being used
        public List<Item> GetByFirebaseUserId(string id)
        {
            return _context.Item.Include(i => i.User)
                .Include(p => p.Category)
                .Where(i => i.User.FirebaseUserId == id)
                .ToList();
        }

        public List<Item> GetItemByCategoryId(int id)
        {
            return _context.Item.Include(p => p.User)
                .Include(p => p.Category)
                .Where(p => p.CategoryId == id)
                .ToList();
        }



        public void Update(Item item)
        {
            _context.Entry(item).State = EntityState.Modified;
            _context.SaveChanges();
        }


        public void Delete(int id)
        {
            var item = GetById(id);


            _context.Item.Remove(item);
            _context.SaveChanges();
        }
    }
}
