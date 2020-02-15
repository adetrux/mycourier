using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Users.Domain;

namespace Users.Dal
{
    public interface IUsersRepository
    {
        Task<IEnumerable<ApplicationUser>> GetUsers();
    }
}
