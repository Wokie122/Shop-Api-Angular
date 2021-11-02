using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtykulyController : ControllerBase
    {

        private readonly ArtykulyService _artykulyService;

        public ArtykulyController(ArtykulyService artykulyService)
        {
            _artykulyService = artykulyService;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<ArtykulDto> Pobierz([FromQuery] StronnicowanieDto stronnicowanie)
        {
            return _artykulyService.Pobierz(stronnicowanie);
        }

        [HttpGet("{id}")]
        [Authorize]
        public ArtykulDto Pobierz(int id)
        {
            return _artykulyService.ZnajdzPoId(id);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ArtykulDto Dodaj([FromBody] ArtykulDto dto)
        {
            return _artykulyService.Dodaj(dto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public ArtykulDto Edytuj(int id, [FromBody] ArtykulDto dto)
        {
            return _artykulyService.Edytuj(id, dto);
        }
    }
}
