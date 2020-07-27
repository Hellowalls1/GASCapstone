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


        public ItemController(ApplicationDbContext context)
        {
            _itemRepository = new ItemRepository(context);
            _userRepository = new UserRepository(context);

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

        [HttpPost]
        public IActionResult Post(Item item)
        {
            var currentUser = GetCurrentUser();
            item.UserId = currentUser.Id;

            _itemRepository.Add(item);
            return CreatedAtAction("Get", new { id = item.Id }, item);
        }

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


            //var userItems = _itemRepository.GetByFirebaseUserId(firebaseUserId);
            //return Ok(userItems);

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

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    var ItemComments = _commentRepository.GetCommentsByItem(id);
        //    ItemComments.ForEach(pc => _commentRepository.Delete(pc));

        //    _itemRepository.Delete(id);
        //    return .();
        //}

    }
}
