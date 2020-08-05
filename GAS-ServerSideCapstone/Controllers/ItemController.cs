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
    public class ItemController : ControllerBase
    {
        private readonly ItemRepository _itemRepository;
        private readonly UserRepository _userRepository;
        private readonly CommentRepository _commentRepository;
        

        public ItemController(ApplicationDbContext context)
        {
            _itemRepository = new ItemRepository(context);
            _userRepository = new UserRepository(context);
            _commentRepository = new CommentRepository(context);
        }

        //getting the authorized user's 
        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_itemRepository.GetAll());
        }

        [Authorize]
        [HttpGet("getallnotforsale")]
        public IActionResult GetAllNotForSale()
        {
            return Ok(_itemRepository.GetAllNotForSale());
        }

        [Authorize]
        [HttpGet("getallitemsforsale")]
        public IActionResult GetAllItemsForSale()
        {
  
            return Ok(_itemRepository.GetAllItemsForSale());
        }


        [HttpPost]
        public IActionResult Post(Item item)
        {
            var currentUser = GetCurrentUser();
            item.UserId = currentUser.Id;

            _itemRepository.Add(item);
            return CreatedAtAction("Get", new { id = item.Id }, item);
        }

        //getting item by id
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _itemRepository.GetById(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("getbycategory/{id}")]
        public IActionResult GetItemByCategoryId(int id)
        {
            var item = _itemRepository.GetItemByCategoryId(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("getbyuser")]
        public IActionResult GetByUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(_itemRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUser();
            item.UserId = currentUser.Id;

            _itemRepository.Update(item);
            return NoContent();
        }

        // getting all the comments by ItemId from the comment repository
        // then for each of the comments accessing the delte function from the comment repository and deleting each one
        // then it deletes the item
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            List<Comment> ItemCommentsToDelete = _commentRepository.GetByItemId(id);
            ItemCommentsToDelete.ForEach (ic => _commentRepository.Delete(ic));

           _itemRepository.Delete(id);
            return NoContent();
        }


    }
}
