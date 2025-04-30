'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Về chúng tôi</h1>
        
        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Giới thiệu</h2>
          <p className="text-gray-700 mb-4">
            KIWEY là công ty công nghệ hàng đầu chuyên cung cấp các giải pháp phần mềm cho doanh nghiệp.
            Được thành lập vào năm 2020, chúng tôi đã phát triển nhanh chóng và trở thành đối tác tin cậy
            của nhiều doanh nghiệp lớn nhỏ trong và ngoài nước.
          </p>
          <p className="text-gray-700 mb-4">
            Với đội ngũ nhân viên giàu kinh nghiệm và đam mê công nghệ, KIWEY luôn nỗ lực không ngừng
            để mang đến những giải pháp tối ưu, giúp khách hàng nâng cao hiệu quả hoạt động và phát triển bền vững.
          </p>
        </section>
        
        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tầm nhìn & Sứ mệnh</h2>
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Tầm nhìn</h3>
            <p className="text-gray-700">
              Trở thành đơn vị dẫn đầu trong lĩnh vực cung cấp giải pháp phần mềm, đồng hành cùng doanh nghiệp
              trong hành trình chuyển đổi số và phát triển bền vững.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Sứ mệnh</h3>
            <p className="text-gray-700">
              Mang đến những giải pháp công nghệ tiên tiến, dễ dàng sử dụng và hiệu quả, 
              giúp doanh nghiệp tối ưu hóa quy trình vận hành, tăng năng suất và giảm chi phí.
            </p>
          </div>
        </section>
        
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Đội ngũ lãnh đạo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://via.placeholder.com/150" alt="CEO" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium">Nguyễn Văn A</h3>
                <p className="text-indigo-600 mb-2">CEO & Founder</p>
                <p className="text-gray-700">
                  Với hơn 15 năm kinh nghiệm trong ngành công nghệ thông tin, ông Nguyễn Văn A 
                  là người đặt nền móng và định hướng phát triển cho KIWEY.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://via.placeholder.com/150" alt="CTO" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium">Trần Thị B</h3>
                <p className="text-indigo-600 mb-2">CTO</p>
                <p className="text-gray-700">
                  Bà Trần Thị B là chuyên gia công nghệ với bề dày kinh nghiệm tại các tập đoàn
                  công nghệ hàng đầu thế giới trước khi gia nhập KIWEY.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}