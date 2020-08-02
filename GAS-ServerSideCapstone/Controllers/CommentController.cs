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

        [HttpGet("getbyitem/{id}")]
        public IActionResult GetByItem(int id)
        {
            return Ok(_commentRepo.GetByItemId(id));
        }

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
