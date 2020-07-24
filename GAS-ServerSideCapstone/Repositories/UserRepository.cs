using GAS_ServerSideCapstone.Data;
using GAS_ServerSideCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GAS_ServerSideCapstone.Repositories
{
    public class UserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.User
            
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(User user)
        {
            _context.Add(user); 
            _context.SaveChanges();
        }
    }
}
