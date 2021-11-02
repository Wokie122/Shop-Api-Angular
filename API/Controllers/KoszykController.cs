using API.Models;
using API.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KoszykController : ControllerBase
    {

        private readonly KoszykService _koszykService;
        private readonly ArtykulyService _artykulyService;

        public KoszykController(KoszykService koszykService, ArtykulyService artykulyService)
        {
            _koszykService = koszykService;
            _artykulyService = artykulyService;
        }

        [HttpGet]
        public IEnumerable<ArtykulDto> Pobierz()
        {
            return _koszykService.Pobierz();
        }

        [HttpPost]
        
        public IEnumerable<ArtykulDto> Dodaj([FromBody] int id)
        {
            ArtykulDto dto = _artykulyService.ZnajdzPoId(id);
            return _koszykService.Dodaj(dto);
        }

        [HttpPut]
        
        public IEnumerable<ArtykulDto> Wyczysc()
        {
           return _koszykService.Wyczysc();
        }
    }
}
