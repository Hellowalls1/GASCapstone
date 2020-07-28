using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GAS_ServerSideCapstone.Data;
using GAS_ServerSideCapstone.Models;
using GAS_ServerSideCapstone.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GAS_ServerSideCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;
        private readonly UserRepository _userProfileRepository;

        public CategoryController(ApplicationDbContext context)
        {
            _categoryRepository = new CategoryRepository(context);
            _userProfileRepository = new UserRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.Update(category);
            return NoContent();
        }

        // Currently, categories can only be deleted while not attached to a Post. Need a post repository method to pull the category by Id and remove the connection 

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }
    }
}
