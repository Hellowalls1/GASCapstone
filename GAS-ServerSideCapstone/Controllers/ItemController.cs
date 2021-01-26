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
        //so controller has access to all of the methods

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
        //not being used
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


        //getting the firebaseUserId and storing it in a variable
        //going to the _itemRepository and getting items by FirebaseUserId and passing the current firebaseUserID as an argument
        [HttpGet("getbyuser")]
        public IActionResult GetByUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(_itemRepository.GetByFirebaseUserId(firebaseUserId));
        }

        //specifying id in the route parameter
        //passing the id and the class/object you are passing as a result
        //making sure the id that came in is the same as the item id
        //passing the current user Id as the id?
        //updating the item
        //no return because we aren't returning any information
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
        // then for each of the comments accessing the delete function from the comment repository and deleting each one
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
