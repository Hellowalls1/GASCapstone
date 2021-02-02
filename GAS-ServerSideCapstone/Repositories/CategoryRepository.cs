using GAS_ServerSideCapstone.Data;
using GAS_ServerSideCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GAS_ServerSideCapstone.Repositories
{
    public class CategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> GetAll()
        {
            return _context.Category
                
                .OrderBy(c => c.Title)
                .ToList();

        }

        public void Add(Category category)
        {
            _context.Add(category);
            _context.SaveChanges();
        }

       

        public Category GetById(int id)
        {
            return _context.Category.FirstOrDefault(c => c.Id == id);
        }
       

    }
}
