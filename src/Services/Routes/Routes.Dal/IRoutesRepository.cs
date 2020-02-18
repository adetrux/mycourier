using Routes.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal
{
    public interface IRoutesRepository
    {
        Task<IEnumerable<Route>> GetRoutes();
    }
}
