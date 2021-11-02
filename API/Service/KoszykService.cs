using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Service
{
    public class KoszykService
    {
        private static List<ArtykulDto> Koszyk = new List<ArtykulDto>
        {
            new ArtykulDto{id = 99, nazwa = "Dostawa", opis = "DHL", cena = 15}
        };

        public IEnumerable<ArtykulDto> Pobierz()
        {
            return Koszyk;
        }

        public IEnumerable<ArtykulDto> Dodaj(ArtykulDto dto)
        {
            Koszyk.Add(dto);
            return Koszyk;
        }
        public IEnumerable<ArtykulDto> Wyczysc()
        {
            Koszyk.Clear();
            return Koszyk;
        }
    }
}
