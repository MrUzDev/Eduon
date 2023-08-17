import React, {useContext, useState, useEffect} from 'react'
import { StateContext } from "../../context/Context";
import NavbarSm from "../Navbar/NavbarSm";
import NavbarDemo from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import './RamadanTaqvims.css'
import { taqvimApi } from './RamadanTaqivimsData';
import moment from 'moment';

export default function RamadanTaqvims() {
  const { navStretch} = useContext(StateContext);

  return (
    <div>
          <NavbarSm />
      <NavbarDemo />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="col-24 ramadon-taqvims">
          <div className="container">
                <div className="taqvims">
                  <div className="taqivim-title">
                    <h3>Ramazon taqvimi 2023</h3>
                  </div>
                  <div className="ramadan-taqvims-list">
                     
                     <table>
                     <tr>
                          <th>Kun</th>
                          <th>Sana</th>
                          <th>Hafta kuni</th>
                          <th>Saharlik</th>
                          <th>Iftorlik</th>
                        </tr>
                      {taqvimApi.map((item, index) => 
                       <tr className={moment().format("Do-MM-YYYY").length == 9 ? moment().format("0Do-MM-YYYY") : moment().format("Do-MM-YYYY") == item.date ? 'activeDate': null}>
                        <td>{index + 1}</td>
                        <td>{item.date}</td>
                        <td>{item.week}</td>
                        <td>{item.morning}</td>
                        <td>{item.exaggeration}</td>
                       </tr>
                      )}
                     </table>
                  </div>
                </div>

                <div className="Ramadan-blessing">
                    <div className="first-blessing">
                        <h3> Ro‘za tutish (saharlik, og‘iz yopish) duosi</h3>

                        <h4>نَوَيْتُ أَنْ أَصُومَ صَوْمَ شَهْرَ رَمَضَانَ مِنَ الْفَجْرِ إِلَى الْمَغْرِبِ، خَالِصًا لِلهِ تَعَالَى أَللهُ أَكْبَرُ</h4>

                        <h6>Navaytu an asuvma sovma shahri ramazona minal fajri ilal mag'ribi, xolisan lillahi ta'aalaa Allohu akbar.</h6>

                        <p>Ma’nosi: Ramazon oyining ro‘zasini subhdan to kun botguncha tutmoqni niyat qildim. Xolis Alloh uchun Alloh buyukdir.</p>
                    </div>


                    <div className="second-blessing">
                        <h3>Iftorlik (og‘iz ochish) duosi</h3>

                        <h4>اَللَّهُمَّ لَكَ صُمْتُ وَ بِكَ آمَنْتُ وَ عَلَيْكَ تَوَكَّلْتُ وَ عَلَى رِزْقِكَ أَفْتَرْتُ، فَغْفِرْلِى مَا قَدَّمْتُ وَ مَا أَخَّرْتُ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ</h4>

                        <h6>Allohuma laka sumtu va bika aamantu va a'layka tavakkaltu va a'laa rizqika aftartu, fag'firliy ma qoddamtu va maa axxortu birohmatika yaa arhamar roohimiyn.</h6>

                        <p>Ma’nosi: Ey Alloh, ushbu Ro‘zamni Sen uchun tutdim va Senga iymon keltirdim va Senga tavakkal qildim va bergan rizqing bilan iftor qildim. Ey mehribonlarning eng mehriboni, mening avvalgi va keyingi gunohlarimni mag‘firat qilgil.</p>
                    </div>
                </div>
                
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}