import React from 'react';

const teamMembers = [
  {
    name: 'Sandy Sanjaya',
    role: 'ML Engineer',
    image: '/images/team/avatar-1.png',
    responsibility: 'Evaluasi model, Hyperparameter tuning, Visualisasi, Project management'
  },
  {
    name: 'Dimas Sukmana',
    role: 'ML Engineer',
    image: '/images/team/avatar-2.png',
    responsibility: 'Pengumpulan data, Preprocessing data, Pembuatan model, Visualisasi model'
  },
  {
    name: 'Afwa Hamzah Al Rasyid',
    role: 'ML Engineer',
    image: '/images/team/avatar-3.png',
    responsibility: 'Konversi model deployment (TensorFlow.js)'
  },
  {
    name: 'Reizka Fathia',
    role: 'Frontend Developer',
    image: '/images/team/avatar-4.png',
    responsibility: 'UI/UX design, Integrasi API, Upload foto dari galeri'
  },
  {
    name: 'Muhammad Ibnu Alwan',
    role: 'Backend Developer',
    image: '/images/team/avatar-5.png',
    responsibility: 'Setup server, Integrasi model CNN, Pengambilan API'
  }
];

const Team = () => {
  return (
    <section className="section bg-gray-50" id="team">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tim Pengembang
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Kenali tim yang bekerja di balik sistem Mantoma
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary-100 h-40 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-white"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=' + member.name.charAt(0);
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-700 text-sm">{member.responsibility}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;