using GAS_ServerSideCapstone.Data;
using GAS_ServerSideCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GAS_ServerSideCapstone.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetAll()
        {
            return _context.Comment
                .Include(c => c.User)
                .Include(c => c.Item)
                .ThenInclude(i => i.User)
                .ToList();
        }

        public Comment GetById(int id)
        {
            return _context.Comment
                .Include(c => c.User)
                .Include(c => c.Item)
                .ThenInclude(i => i.User)
                .FirstOrDefault(c => c.Id == id);
        }

        public List<Comment> GetByItemId(int id)
        {
            return _context.Comment
                            .Include(c => c.Item)
                            .ThenInclude(i => i.User)
                            .Include(c => c.User)
                            .Where(c => c.ItemId == id)
                            .ToList();
        }
        //public List<Comment> GetCommentsByPost(int PostId)
        //{
        //    var All = _context.Comment.Where(c => c.ItemId == ItemId).ToList();

        //    return All;
        //}
        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Delete(Comment comment)
        {

            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
