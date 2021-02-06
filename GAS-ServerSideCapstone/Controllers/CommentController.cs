using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GAS_ServerSideCapstone.Data;
using GAS_ServerSideCapstone.Models;
using GAS_ServerSideCapstone.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GAS_ServerSideCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentRepository _commentRepo;
        private readonly UserRepository _userRepository;
        public CommentController(ApplicationDbContext context)
        {
            _commentRepo = new CommentRepository(context);
            _userRepository = new UserRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepo.GetAll());
        }
        // needed for the update in the front end ui
        //it's used at the end of the comment update in the comment provider
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var comment = _commentRepo.GetById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }
        //passing item id to GetByItemId method in repository
        [HttpGet("getbyitem/{id}")]
        public IActionResult GetByItem(int id)
        {
            return Ok(_commentRepo.GetByItemId(id));
        }

        //getting the current user
        private User GetCurrentUser()
        {
            string firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
        [Authorize]
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            var currentUser = GetCurrentUser();
            comment.UserId = currentUser.Id;

            _commentRepo.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }
        //passing the id and the object/class of comment
        //if the ids are not the same return a bad request
        //making sure that the user id is the current user id because it isn't passing the user id it is just passing the  comment id
        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUser();
            comment.UserId = currentUser.Id;

            _commentRepo.Update(comment);
            return NoContent();
        }
    }
}
