using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
    public class ArtykulyService
    {
        private static List<ArtykulDto> Artykuly = new List<ArtykulDto>
        {
            new ArtykulDto{id = 1, nazwa = "iPhone 12 Pro", opis = "6 GB RAM + 1024 GB STORAGE", cena = 6000},
            new ArtykulDto{id = 2, nazwa = "iPhone 12 Pro", opis = "6 GB RAM + 512 GB STORAGE", cena = 5500},
            new ArtykulDto{id = 3, nazwa = "iPhone 12", opis = "4 GB RAM + 256 GB STORAGE", cena = 4500},
            new ArtykulDto{id = 4, nazwa = "iPhone 12 Mini   ", opis = "4 GB RAM + 128 GB STORAGE", cena = 3600},
            new ArtykulDto{id = 5, nazwa = "iPhone 11 PRO ", opis = "4 GB RAM + 512 GB STORAGE", cena = 4500},
            new ArtykulDto{id = 6, nazwa = "iPhone 11 PRO", opis = "4 GB RAM + 256 GB STORAGE", cena = 4000},
            new ArtykulDto{id = 7, nazwa = "iPhone 11", opis = "3 GB RAM + 128 GB STORAGE", cena = 3500},
            new ArtykulDto{id = 8, nazwa = "iPhone Xs", opis = "3 GB RAM + 64 GB STORAGE", cena = 2500},
            new ArtykulDto{id = 9, nazwa = "iPhone Xr", opis = "2 GB RAM + 32 GB STORAGE", cena = 1500},
        };

        public IEnumerable<ArtykulDto> Pobierz(StronnicowanieDto stronnicowanie)
        {
            return Artykuly.Skip((stronnicowanie.Strona - 1) * stronnicowanie.Ilosc).Take(stronnicowanie.Ilosc);
        }

        public ArtykulDto ZnajdzPoId(int id)
        {
            return Artykuly.Find(a => a.id == id);
        }

        public ArtykulDto Dodaj(ArtykulDto dto)
        {
            dto.id = Artykuly.Max(o => o.id) + 1;
            Artykuly.Add(dto);
            return dto;
        }

        public ArtykulDto Edytuj(int id, ArtykulDto dto)
        {
            var artykul = Artykuly.Find(o => o.id == id);
            artykul.cena = dto.cena;
            artykul.nazwa = dto.nazwa;
            artykul.opis = dto.opis;
            return artykul;
        }
    }
}
