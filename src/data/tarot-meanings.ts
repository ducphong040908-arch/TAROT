/**
 * DEEP 78-CARD INTERPRETATION KNOWLEDGE BASE (tarot-meanings.ts)
 * Tinh chỉnh và đúc kết từ các phương pháp phân tích Tarot kinh điển:
 * - Rachel Pollack (78 Degrees of Wisdom): Tâm lý học chiều sâu & hành trình tiến hóa nhận thức
 * - Benebell Wen (Holistic Tarot): Phân tích đa chiều (Tình yêu, Sự nghiệp, Học tập, Tài chính, Sức khỏe)
 * - Mary K. Greer (21 Ways to Read a Tarot Card & Court Cards): Biểu tượng thị giác & Nhân vật đại diện
 */

import { FULL_TAROT_DECK } from "@/data/tarot-deck";

export interface TarotDomainMeanings {
  general: string;
  love: string;
  career: string;
  study: string;
  finance: string;
  health: string;
}

export interface TarotDeepMeaning {
  tone: number; // -2 to +2
  essence: string;
  symbols: string;
  person?: string;
  advice: string;
  up: TarotDomainMeanings;
  rev: TarotDomainMeanings;
}

export const MAJOR_DEEP: Record<string, TarotDeepMeaning> = {
  "The Fool": {
    tone: 1,
    essence:
      "Tiềm năng vô hạn trước khi định hình (Số 0). Bước nhảy của niềm tin thuần khiết vào vùng đất mới mà không bị nỗi sợ quá khứ cầm tù.",
    symbols:
      "Đóa hồng trắng (sự thuần khiết), túi hành lý nhỏ (kinh nghiệm tối giản), chú chó trắng (bản năng bảo vệ và đồng hành), vách đá (ngưỡng cửa giữa cái đã biết và chưa biết).",
    person:
      "Một người tự do, lạc quan, giàu tính sáng tạo, thích khám phá cái mới và không ngại rủi ro.",
    advice:
      "Hãy cho phép mình bắt đầu với tâm thế 'người mới' (Beginner's Mind), nhưng nhớ nhìn kỹ bước chân thực tế.",
    up: {
      general:
        "Một hành trình hoàn toàn mới đang mở ra. Bạn được mời gọi bước khỏi vùng an toàn bằng sự háo hức và niềm tin vào con đường phía trước.",
      love:
        "Một rung động mới mẻ, tự nhiên và không vụ lợi. Nếu đang yêu, hãy mang lại sự tươi mới, ngẫu hứng cho mối quan hệ; nếu độc thân, một cuộc gặp gỡ bất ngờ đang chờ bạn.",
      career:
        "Thời điểm lý tưởng để khởi nghiệp, thử sức ở lĩnh vực mới, chuyển hướng nghề nghiệp hoặc đề xuất một ý tưởng đột phá chưa ai dám làm.",
      study:
        "Rất thuận lợi để bắt đầu học một ngôn ngữ, công nghệ hoặc môn học hoàn toàn mới với sự tò mò cao độ.",
      finance:
        "Cơ hội đầu tư hoặc nguồn thu mới xuất hiện, nhưng cần tìm hiểu kỹ trước khi rót vốn lớn.",
      health:
        "Năng lượng dồi dào, tinh thần phấn chấn; thích hợp với các hoạt động vận động ngoài trời.",
    },
    rev: {
      general:
        "Cảnh báo sự liều lĩnh thiếu suy nghĩ hoặc ngược lại — nỗi sợ bị đánh giá khiến bạn chùn bước ngay trước ngưỡng cửa cơ hội.",
      love:
        "Mối quan hệ thiếu cam kết, bốc đồng hoặc một trong hai người còn tâm lý sợ ràng buộc.",
      career:
        "Thiếu kế hoạch cụ thể khi nhảy việc hoặc bắt đầu dự án; cẩn thận những quyết định vội vàng lúc cảm xúc nhất thời.",
      study:
        "Học tập thiếu định hướng, cả thèm chóng chán, cần lập lại kỷ luật ôn luyện.",
      finance:
        "Chi tiêu bốc đồng hoặc đầu tư mạo hiểm khi chưa nắm rõ thông tin.",
      health: "Cẩn thận những bất cẩn nhỏ trong đi lại, sinh hoạt hàng ngày.",
    },
  },
  "The Magician": {
    tone: 2,
    essence:
      "Ý chí chủ động dẫn truyền năng lượng từ ý tưởng xuống thực tại ('Như trên cao, thế dưới thấp'). Bạn đã có đủ cả 4 nguyên tố trên bàn.",
    symbols:
      "Biểu tượng vô cực trên đầu (trí tuệ không giới hạn), tay chỉ lên trời - tay chỉ xuống đất (cầu nối ý tưởng và hiện thực), 4 pháp khí Gậy-Cốc-Kiếm-Tiền trên bàn (đủ đầy nguồn lực).",
    person:
      "Người có năng lực chuyên môn xuất sắc, ăn nói thuyết phục, chủ động và biết biến ý tưởng thành sản phẩm thực tế.",
    advice:
      "Tập trung toàn bộ sự chú ý vào 1 mục tiêu duy nhất và bắt tay hành động ngay.",
    up: {
      general:
        "Thời điểm vàng để hành động. Mọi kỹ năng, công cụ và cơ hội đều đã nằm trong tay bạn — bạn chính là người kiến tạo kết quả.",
      love:
        "Sự chủ động bày tỏ tình cảm và giao tiếp chân thành tạo nên sức hút mạnh mẽ. Mối quan hệ có bước tiến rõ rệt nhờ hành động thực tế.",
      career:
        "Năng lực chuyên môn tỏa sáng; rất thuận lợi cho thuyết trình, phỏng vấn, đàm phán hoặc dẫn dắt dự án trọng điểm.",
      study:
        "Khả năng tiếp thu và ứng dụng lý thuyết vào thực hành cực kỳ nhạy bén; đạt kết quả cao trong đồ án/thi cử.",
      finance:
        "Khả năng kiếm tiền từ chính kỹ năng chuyên môn hoặc mở thêm nguồn thu nhập mới bằng sự nhạy bén.",
      health:
        "Sức khỏe hồi phục nhanh, tinh thần minh mẫn và làm chủ tốt nhịp sinh học.",
    },
    rev: {
      general:
        "Tiềm năng bị phân tán do ôm đồm nhiều thứ, tự nghi ngờ năng lực bản thân, hoặc có ai đó đang dùng lời nói bóng bẩy thiếu trung thực.",
      love:
        "Cẩn thận những lời hứa hẹn ngọt ngào nhưng thiếu hành động thực tế, hoặc sự thiếu minh bạch trong giao tiếp.",
      career:
        "Có đủ kỹ năng nhưng thiếu sự tập trung dứt điểm; tránh làm việc nửa vời.",
      study: "Biết nhiều thứ bề nổi nhưng chưa đào sâu gốc rễ kiến thức.",
      finance:
        "Cẩn trọng với các lời mời gọi đầu tư hào nhoáng; kiểm tra kỹ hợp đồng.",
      health: "Căng thẳng thần kinh do suy nghĩ và làm việc đa nhiệm quá mức.",
    },
  },
  "The High Priestess": {
    tone: 1,
    essence:
      "Trí tuệ tĩnh lặng của tiềm thức và trực giác. Không phải lúc nào cũng cần hành động — có những câu trả lời chỉ lộ diện trong sự tĩnh tâm.",
    symbols:
      "Hai cột trụ Đen (Boaz) và Trắng (Jachin) biểu thị tính nhị nguyên, tấm màn lựu che giấu tri thức mật truyền, cuộn sách Torah trên đùi và vầng trăng lưỡi liềm dưới chân.",
    person:
      "Người kín đáo, sâu sắc, giàu trực giác, biết lắng nghe và nhìn thấu những điều người khác không nói ra.",
    advice:
      "Lùi lại quan sát, tin vào linh cảm đầu tiên của bạn và giữ kín kế hoạch khi chưa đến lúc.",
    up: {
      general:
        "Hãy lắng nghe trực giác và những tín hiệu ngầm. Có những yếu tố ẩn phía sau tình huống mà thời gian sẽ sớm làm sáng tỏ.",
      love:
        "Sự kết nối tâm hồn sâu sắc, thầm lặng; đôi khi là một tình cảm đơn phương kín đáo hoặc mối quan hệ cần sự tinh tế thấu hiểu không lời.",
      career:
        "Nên tập trung nghiên cứu chuyên sâu, tìm hiểu kỹ thông tin nội bộ trước khi đưa ra quyết định lớn.",
      study:
        "Rất hợp với việc tự học, nghiên cứu học thuật chuyên sâu và tìm tòi tài liệu gốc.",
      finance:
        "Giữ kín tình hình tài chính cá nhân; quan sát thị trường kỹ thay vì chạy theo đám đông.",
      health:
        "Lắng nghe những tín hiệu nhỏ của cơ thể; chú ý giấc ngủ và sự cân bằng nội tiết.",
    },
    rev: {
      general:
        "Bạn đang phớt lờ linh cảm đúng đắn của mình để chạy theo ý kiến bên ngoài, hoặc có bí mật/hiểu lầm đang gây khoảng cách.",
      love:
        "Sự lạnh nhạt, giấu giếm cảm xúc thật hoặc nghi ngờ thiếu căn cứ trong mối quan hệ.",
      career:
        "Thiếu thông tin quan trọng do không tìm hiểu kỹ mặt sau của vấn đề.",
      study: "Học vẹt bề nổi mà chưa hiểu bản chất sâu bên trong.",
      finance: "Có khoản chi phí ẩn hoặc điều khoản chưa đọc kỹ.",
      health: "Bỏ qua các dấu hiệu mệt mỏi sớm của cơ thể.",
    },
  },
  "The Empress": {
    tone: 2,
    essence:
      "Nguồn năng lượng nuôi dưỡng, trù phú, sáng tạo và tình yêu thương vô điều kiện của Đất Mẹ.",
    symbols:
      "Vương miện 12 ngôi sao (12 tháng/cung hoàng đạo), cánh đồng lúa mì chín vàng (sự sung túc), dòng suối chảy (cảm xúc dạt dào), biểu tượng Sao Kim trên gối.",
    person:
      "Người ấm áp, chu đáo, giàu lòng trắc ẩn, yêu cái đẹp và luôn chăm lo cho người khác.",
    advice:
      "Hãy nuôi dưỡng dự án và bản thân bằng sự kiên nhẫn, dịu dàng và tận hưởng những điều tốt đẹp quanh mình.",
    up: {
      general:
        "Giai đoạn đơm hoa kết trái đầy thuận lợi. Sự sáng tạo, đủ đầy vật chất và cảm giác bình yên đang bao bọc bạn.",
      love:
        "Tình cảm nồng ấm, ngọt ngào, được yêu thương và trân trọng. Mối quan hệ tiến triển bền vững, có thể có tin vui về gia đình.",
      career:
        "Các dự án sáng tạo, thiết kế, chăm sóc khách hàng hoặc xây dựng đội nhóm phát triển rất mạnh và mang lại thành quả rõ rệt.",
      study:
        "Tâm lý thoải mái giúp việc học và sáng tạo ý tưởng diễn ra tự nhiên, hiệu quả.",
      finance:
        "Tài chính dồi dào, sung túc; các khoản đầu tư trước đây bắt đầu sinh lời.",
      health:
        "Sức khỏe dồi dào, tinh thần thư thái; rất tốt cho việc nghỉ dưỡng cùng thiên nhiên.",
    },
    rev: {
      general:
        "Cảm giác cạn kiệt năng lượng vì chăm lo cho người khác quá nhiều mà quên bản thân, hoặc sự trì trệ trong sáng tạo.",
      love:
        "Sự phụ thuộc cảm xúc hoặc kiểm soát quá mức nhân danh sự quan tâm.",
      career: "Dự án thiếu cảm hứng mới hoặc chậm tiến độ do thiếu sự chăm chút.",
      study: "Lười biếng tạm thời do quá nuông chiều bản thân.",
      finance: "Chi tiêu quá tay cho mua sắm hưởng thụ.",
      health:
        "Cần chú ý chế độ dinh dưỡng và dành thời gian chăm sóc lại chính mình.",
    },
  },
  "The Emperor": {
    tone: 1,
    essence:
      "Trật tự, cấu trúc, kỷ luật, ranh giới rõ ràng và bản lĩnh bảo vệ thành quả bằng lý trí vững vàng.",
    symbols:
      "Ngai đá khắc đầu cừu Bạch Dương (sự tiên phong quyết đoán), quả cầu và quyền trượng Ankh (quyền làm chủ), bộ giáp sắt bên dưới áo choàng đỏ (luôn sẵn sàng bảo vệ).",
    person:
      "Người trưởng thành, có uy tín, nguyên tắc, quyết đoán, đáng tin cậy hoặc một người quản lý/tiền bối.",
    advice:
      "Thiết lập kế hoạch có kỷ luật thép, phân chia mục tiêu rõ ràng và làm chủ tình hình.",
    up: {
      general:
        "Sự ổn định và thành công đạt được nhờ tư duy hệ thống, tính kỷ luật và khả năng lãnh đạo vững chắc.",
      love:
        "Mối quan hệ nghiêm túc, có trách nhiệm và mang lại cảm giác an toàn vững chãi dù đôi khi hơi kiệm lời lãng mạn.",
      career:
        "Cơ hội thăng tiến lên vị trí quản lý, làm chủ dự án hoặc đạt thành tựu lớn nhờ quy trình làm việc chuẩn chỉnh.",
      study:
        "Lập thời gian biểu ôn tập nghiêm ngặt và tuân thủ kỷ luật sẽ mang lại điểm số xuất sắc.",
      finance:
        "Quản lý tài chính cực kỳ chặt chẽ, an toàn và tích lũy bền vững.",
      health: "Sức bền tốt; duy trì thói quen tập luyện thể thao có kỷ luật.",
    },
    rev: {
      general:
        "Sự cứng nhắc, bảo thủ, độc đoán gây ngột ngạt, hoặc ngược lại là sự thiếu kỷ luật khiến kế hoạch đổ vỡ.",
      love:
        "Tính gia trưởng, áp đặt hoặc tranh giành quyền kiểm soát trong mối quan hệ.",
      career:
        "Mâu thuẫn với cấp trên cứng nhắc hoặc dự án rối loạn vì thiếu người cầm trịch.",
      study: "Thiếu tự giác, dễ bỏ dở kế hoạch học tập giữa chừng.",
      finance: "Thất thoát do thiếu kiểm soát ngân sách.",
      health: "Căng cơ, đau đầu hoặc huyết áp do áp lực kiểm soát mọi thứ.",
    },
  },
  "The Hierophant": {
    tone: 1,
    essence:
      "Tri thức truyền thống, hệ thống chuẩn mực, sự dẫn dắt của người thầy và những cam kết được xã hội công nhận.",
    symbols:
      "Ba tầng vương miện và hai chiếc chìa khóa chéo (mở cánh cửa tri thức), hai môn đệ quỳ phía trước (sự truyền thụ kiến thức từ thế hệ trước).",
    person:
      "Giảng viên, mentor, chuyên gia giàu kinh nghiệm hoặc người coi trọng đạo đức, truyền thống.",
    advice:
      "Hãy học hỏi bài bản từ những nguồn chuẩn mực và lắng nghe lời khuyên của người có chuyên môn.",
    up: {
      general:
        "Thuận lợi khi đi theo lộ trình chính thống, tuân thủ quy chuẩn và làm việc cùng tập thể hoặc người hướng dẫn.",
      love:
        "Mối quan hệ truyền thống, nghiêm túc, được gia đình ủng hộ và hướng tới cam kết lâu dài/hôn nhân.",
      career:
        "Phù hợp làm việc trong các tập đoàn lớn, cơ quan, viện nghiên cứu hoặc phát triển nhờ có mentor dìu dắt.",
      study:
        "Lá bài cực tốt cho học tập, thi cử, bảo vệ khóa luận và lấy chứng chỉ chuyên ngành.",
      finance: "Quản lý tiền bạc an toàn qua các kênh truyền thống, minh bạch.",
      health: "Tuân thủ đúng phác đồ và lời khuyên của bác sĩ chuyên khoa.",
    },
    rev: {
      general:
        "Những quy tắc cũ kỹ đang kìm hãm sự sáng tạo của bạn; đây là lúc cần dám nghĩ khác và tìm lối đi riêng.",
      love:
        "Áp lực từ định kiến gia đình/xã hội hoặc hai người có quan điểm sống khác biệt.",
      career:
        "Cảm thấy gò bó trong môi trường hành chính cứng nhắc, muốn đổi mới quy trình.",
      study:
        "Cần đổi sang phương pháp học chủ động, thực hành thay vì chỉ học lý thuyết sách vở.",
      finance: "Tránh đầu tư theo lời khuyên sáo rỗng chưa kiểm chứng.",
      health: "Kết hợp thay đổi lối sống năng động hơn.",
    },
  },
  "The Lovers": {
    tone: 2,
    essence:
      "Sự hòa hợp sâu sắc giữa hai tâm hồn và bước ngoặt lựa chọn dựa trên hệ giá trị chân thật nhất của bản thân.",
    symbols:
      "Thiên thần Raphael ban phước từ trên cao (nguyên tố Khí - sự kết nối tâm thức), Cây Tri Thức và Cây Sự Sống phía sau người nam và người nữ, ngọn núi vươn cao.",
    person:
      "Người bạn đời, tri kỷ, đối tác ăn ý hoặc người khiến trái tim bạn rung động mạnh mẽ.",
    advice:
      "Hãy lựa chọn điều mà cả trái tim lẫn phẩm giá của bạn đều đồng thuận — đừng chọn nửa vời.",
    up: {
      general:
        "Sự gắn kết tuyệt vời và một lựa chọn quan trọng mở ra hướng đi đúng đắn với con người thật của bạn.",
      love:
        "Tình yêu đôi lứa nồng nàn, thấu hiểu và đồng điệu cả về cảm xúc lẫn tâm hồn. Tín hiệu rất đẹp cho tình duyên.",
      career:
        "Hợp tác kinh doanh hoặc làm việc nhóm cực kỳ ăn ý; đứng trước lựa chọn nghề nghiệp quan trọng và chọn đúng đam mê.",
      study:
        "Tìm được môn học/chuyên ngành thực sự yêu thích hoặc người bạn học cùng tiến bộ.",
      finance: "Hợp tác tài chính đôi bên cùng có lợi.",
      health: "Tinh thần phấn chấn nhờ cảm giác được yêu thương và sẻ chia.",
    },
    rev: {
      general:
        "Sự do dự ở ngã ba đường, mâu thuẫn nội tâm giữa lý trí và cảm xúc, hoặc sự lệch nhịp trong mối quan hệ.",
      love: "Hiểu lầm, thiếu sự đồng thuận hoặc bị phân tâm bởi yếu tố bên ngoài.",
      career:
        "Bất đồng quan điểm với đồng đội hoặc chọn công việc chỉ vì hào nhoáng bên ngoài.",
      study:
        "Phân vân giữa nhiều hướng học tập mà chưa dồn tâm sức vào một hướng.",
      finance: "Tránh nhập nhằng tiền bạc trong các mối quan hệ tình cảm.",
      health: "Mất cân bằng do căng thẳng cảm xúc.",
    },
  },
  "The Chariot": {
    tone: 2,
    essence:
      "Ý chí sắt đá làm chủ những luồng lực đối lập để bứt phá thẳng tới mục tiêu và giành chiến thắng.",
    symbols:
      "Chiếc chiến xa được kéo bởi hai nhân sư Đen và Trắng (hai luồng cảm xúc/lực kéo trái ngược) nhưng không dùng dây cương mà điều khiển bằng ý chí tinh thần.",
    person:
      "Người cực kỳ quyết tâm, nghị lực, có tinh thần chiến binh và không bao giờ lùi bước trước khó khăn.",
    advice:
      "Giữ vững mục tiêu, gom mọi nguồn lực về một hướng và tiến thẳng về phía trước.",
    up: {
      general:
        "Chiến thắng nhờ sự kiên định và tự chủ! Dù có nhiều trở ngại, tốc độ và quyết tâm của bạn sẽ vượt qua tất cả.",
      love:
        "Chủ động theo đuổi tình cảm hoặc cùng nhau vượt qua khoảng cách/thử thách để giữ vững mối quan hệ.",
      career:
        "Bứt phá ngoạn mục trong dự án, vượt qua các đối thủ cạnh tranh, có cơ hội công tác hoặc mở rộng thị trường.",
      study:
        "Vượt qua kỳ thi cam go, bảo vệ đồ án thành công rực rỡ nhờ nỗ lực bền bỉ.",
      finance: "Thu nhập tăng trưởng mạnh nhờ sự quyết đoán nắm bắt thời cơ.",
      health: "Thể lực sung mãn, sức đề kháng và ý chí hồi phục rất mạnh.",
    },
    rev: {
      general:
        "Cảm giác mất kiểm soát tay lái, chạy quá nhanh mà lệch hướng, hoặc để cảm xúc bốc đồng dẫn dắt.",
      love:
        "Nóng vội thúc ép đối phương hoặc mối quan hệ đang đi lệch mục tiêu chung.",
      career:
        "Dự án bị đình trệ do thiếu sự thống nhất giữa các bộ phận.",
      study:
        "Áp lực thi cử làm bạn rối nhịp; cần bình tĩnh sắp xếp lại lộ trình.",
      finance: "Cẩn thận chi phí phát sinh liên quan đến phương tiện đi lại.",
      health: "Chú ý nghỉ ngơi, tránh lao lực quá sức.",
    },
  },
  Strength: {
    tone: 2,
    essence:
      "Sức mạnh nội lực mềm mại: thu phục bản năng nóng nảy không phải bằng bạo lực mà bằng lòng kiên nhẫn, bao dung và sự điềm tĩnh.",
    symbols:
      "Người phụ nữ mặc áo trắng nhẹ nhàng khép hàm con sư tử đỏ (thu phục cái tôi và nỗi sợ bằng tình thương), biểu tượng vô cực trên đầu.",
    person:
      "Người điềm đạm, kiên cường, giàu lòng vị tha, bên ngoài dịu dàng nhưng bên trong vững như bàn thạch.",
    advice:
      "Dùng sự bình tĩnh và kiên nhẫn để hóa giải áp lực — bạn mạnh mẽ hơn bạn tưởng rất nhiều.",
    up: {
      general:
        "Nội lực vững vàng giúp bạn vượt qua giai đoạn thử thách một cách êm đẹp và đầy phẩm giá.",
      love:
        "Tình cảm bền chặt nhờ sự bao dung, thấu hiểu và kiên nhẫn lắng nghe nhau qua những lúc sóng gió.",
      career:
        "Xử lý khủng hoảng hoặc áp lực công việc cực kỳ khéo léo; thu phục lòng người bằng sự chân thành và bản lĩnh.",
      study:
        "Sự kiên trì ôn luyện bền bỉ từng ngày giúp bạn chinh phục những môn học khó nhất.",
      finance: "Kiểm soát tốt ham muốn chi tiêu, tích lũy vững vàng.",
      health: "Sức sống bền bỉ, khả năng hồi phục thể chất và tinh thần rất tốt.",
    },
    rev: {
      general:
        "Sự tự ti, nghi ngờ bản thân hoặc để cơn nóng giận/mệt mỏi nhất thời làm mất bình tĩnh.",
      love:
        "Dễ tự ái, hờn giận hoặc cảm thấy đuối sức khi phải nhường nhịn mãi.",
      career: "Cảm giác thiếu tự tin khi đứng trước nhiệm vụ lớn.",
      study: "Nản lòng trước bài toán khó; hãy chia nhỏ vấn đề để giải quyết.",
      finance: "Chi tiêu theo cảm xúc lúc căng thẳng.",
      health:
        "Suy giảm năng lượng do căng thẳng kéo dài; cần bồi bổ và ngủ đủ giấc.",
    },
  },
  "The Hermit": {
    tone: 0,
    essence:
      "Hành trình rút lui vào tĩnh lặng để soi sáng nội tâm và tìm ra chân lý bằng chính trải nghiệm của mình.",
    symbols:
      "Ông lão đứng trên đỉnh núi tuyết (độ cao của sự chiêm nghiệm), chiếc đèn lồng chứa ngôi sao 6 cánh (ngọn đèn trí tuệ chỉ chiếu sáng từng bước chân trước mặt), cây gậy dẫn đường.",
    person:
      "Người trầm tĩnh, sâu sắc, thích làm việc độc lập, nhà nghiên cứu hoặc một người thầy tâm thức.",
    advice:
      "Tạm rời xa đám đông ồn ào để suy ngẫm thấu đáo xem điều gì mới thực sự có ý nghĩa với bạn.",
    up: {
      general:
        "Khoảng lặng quý giá để tự vấn, nghiên cứu sâu và tìm ra câu trả lời gốc rễ từ bên trong.",
      love:
        "Cần không gian riêng để hiểu rõ lòng mình. Nếu độc thân, bạn đang ưu tiên hoàn thiện bản thân trước khi mở lòng.",
      career:
        "Rất thuận lợi cho công việc nghiên cứu, phân tích, lập trình, kiểm thử hoặc định hướng lại con đường sự nghiệp dài hạn.",
      study:
        "Thời điểm vàng để tự học sâu, viết luận văn, nghiên cứu tài liệu và hiểu thấu bản chất môn học.",
      finance:
        "Sống tối giản, tiết kiệm và suy xét cẩn trọng mọi khoản đầu tư.",
      health: "Tĩnh dưỡng, thiền định và nghỉ ngơi giúp phục hồi thần kinh.",
    },
    rev: {
      general:
        "Sự cô lập quá mức, khép mình khỏi sự giúp đỡ của người thân hoặc sa đà vào suy nghĩ tiêu cực một mình.",
      love: "Khoảng cách lạnh nhạt trong mối quan hệ do thiếu sẻ chia.",
      career: "Làm việc quá đơn độc, ngại trao đổi nên chậm tiến độ nhóm.",
      study: "Bế tắc vì ngại hỏi thầy cô, bạn bè khi gặp phần kiến thức khó.",
      finance: "Quá khắt khe hoặc bỏ lỡ thông tin thị trường bên ngoài.",
      health:
        "Cảm giác cô đơn ảnh hưởng tới tâm trạng; nên ra ngoài hít thở và trò chuyện.",
    },
  },
  "Wheel of Fortune": {
    tone: 2,
    essence:
      "Sự vận động không ngừng của các chu kỳ cuộc sống và những cơ hội định mệnh xuất hiện đúng thời điểm.",
    symbols:
      "Bánh xe 8 nan với ký tự TORA/TARO và chữ cái Hebrew YHVH, 4 sinh vật có cánh ở 4 góc (4 nguyên tố/cung cố định luôn vững vàng giữa vòng quay biến động).",
    person:
      "Người mang đến cơ hội bất ngờ, thích nghi nhanh với thời cuộc và luôn lạc quan trước biến động.",
    advice:
      "Đón nhận sự thay đổi với tâm thế linh hoạt và giữ tâm mình ở trục giữa bình tĩnh của bánh xe.",
    up: {
      general:
        "Vận may và bước ngoặt tích cực đang xoay về phía bạn! Những bế tắc trước đó dần tháo gỡ, mở ra cơ hội bất ngờ.",
      love:
        "Cuộc gặp gỡ tình cờ mang tính nhân duyên hoặc một chuyển biến tích cực giúp mối quan hệ tiến triển mới.",
      career:
        "Cơ hội mới mở ra bất ngờ, chuyển biến thuận lợi trong dự án hoặc gặp đúng thời thế để phát triển.",
      study:
        "Gặp may mắn trong thi cử, bốc trúng chủ đề đã ôn kỹ hoặc tìm được hướng giải quyết mới.",
      finance: "Dòng tiền khởi sắc, có khoản thu bất ngờ hoặc vận may tài lộc.",
      health: "Sức khỏe chuyển biến theo chiều hướng tốt lên rõ rệt.",
    },
    rev: {
      general:
        "Một giai đoạn trồi sụt ngoài dự kiến nhắc bạn kiên nhẫn chờ qua khúc quanh thay vì cố cưỡng cầu.",
      love:
        "Những hiểu lầm hoặc yếu tố khách quan bên ngoài làm mối quan hệ chững lại tạm thời.",
      career:
        "Kế hoạch bị thay đổi vào phút chót do yếu tố thị trường/tổ chức; cần phương án dự phòng.",
      study: "Không nên học tủ, cần ôn đều để tránh bất ngờ trong đề thi.",
      finance: "Thận trọng với biến động thị trường, tránh đầu cơ may rủi.",
      health: "Chú ý sức khỏe khi thời tiết giao mùa.",
    },
  },
  Justice: {
    tone: 1,
    essence:
      "Quy luật Nhân - Quả minh bạch, sự cân bằng tuyệt đối của lý trí, sự thật và trách nhiệm.",
    symbols:
      "Thanh kiếm hướng thẳng lên (sự quyết đoán phân minh), chiếc cân thăng bằng (sự công tâm không thiên vị), tấm màn tím và hai cột trụ.",
    person:
      "Người công tâm, thẳng thắn, trọng chữ tín, làm việc theo nguyên tắc và luật lệ rõ ràng.",
    advice:
      "Hãy nhìn nhận vấn đề hoàn toàn khách quan, trung thực và quyết định dựa trên sự thật.",
    up: {
      general:
        "Sự công bằng được thực thi. Mọi công sức và sự tử tế bạn gieo xuống đều nhận lại kết quả xứng đáng.",
      love:
        "Mối quan hệ bình đẳng, tôn trọng lẫn nhau và rõ ràng trong cam kết.",
      career:
        "Thuận lợi trong ký kết hợp đồng, đánh giá năng lực công bằng, giải quyết thủ tục pháp lý/hành chính suôn sẻ.",
      study:
        "Điểm số phản ánh chính xác thực lực và công sức ôn luyện nghiêm túc của bạn.",
      finance:
        "Tài chính minh bạch, thu - chi cân đối, giải quyết êm đẹp các khoản nợ/hợp đồng.",
      health: "Cần duy trì sự cân bằng giữa thời gian làm việc và nghỉ ngơi.",
    },
    rev: {
      general:
        "Sự thiếu khách quan, thiên vị, né tránh trách nhiệm hoặc cảm giác bị đối xử thiếu công bằng.",
      love: "Sự cho - nhận lệch cán cân hoặc đổ lỗi cho nhau khi có mâu thuẫn.",
      career:
        "Cẩn trọng các điều khoản hợp đồng chưa rõ ràng hoặc đánh giá chủ quan.",
      study:
        "Cần tự nhìn nhận trung thực lỗ hổng kiến thức của mình để bù đắp.",
      finance: "Rà soát kỹ hóa đơn, sổ sách để tránh sai sót.",
      health: "Mất cân bằng chế độ dinh dưỡng hoặc sinh hoạt.",
    },
  },
  "The Hanged Man": {
    tone: 0,
    essence:
      "Sự tạm dừng tự nguyện và đảo ngược góc nhìn thông thường để đạt tới sự thấu suốt cao hơn.",
    symbols:
      "Chàng trai treo ngược một chân trên cây chữ T nhưng gương mặt hoàn toàn bình thản và tỏa hào quang sáng rực (sự giác ngộ đến khi ngừng vùng vẫy).",
    person:
      "Người có góc nhìn độc đáo khác đám đông, sẵn sàng hy sinh lợi ích ngắn hạn vì lý tưởng lớn.",
    advice:
      "Đừng cố thúc ép lúc này — hãy tạm dừng một nhịp và thử nhìn sự việc từ góc độ ngược lại.",
    up: {
      general:
        "Khoảng dừng cần thiết. Khi bạn chấp nhận buông sự sốt ruột và đổi góc nhìn, giải pháp bất ngờ sẽ xuất hiện.",
      love:
        "Cần đặt mình vào vị trí của đối phương để thấu hiểu, hoặc cho mối quan hệ một khoảng lặng không gây áp lực.",
      career:
        "Dự án tạm thời chờ đợi nhưng giúp bạn có thời gian tối ưu lại thiết kế và tìm ra hướng tiếp cận sáng tạo hơn.",
      study:
        "Thay đổi cách giải bài hoặc nhìn vấn đề từ nguyên lý gốc sẽ tháo gỡ được chỗ đang bí.",
      finance: "Chưa nên rót vốn vội; kiên nhẫn chờ thời điểm rõ ràng hơn.",
      health: "Nghỉ ngơi tĩnh dưỡng, thư giãn cột sống và hệ thần kinh.",
    },
    rev: {
      general:
        "Sự trì hoãn vô ích, bế tắc vì cố chấp hoặc hy sinh một chiều mà không mang lại kết quả gì.",
      love:
        "Mệt mỏi vì chờ đợi một người không rõ ràng hoặc hy sinh quá nhiều trong tình cảm.",
      career: "Chần chừ mãi không chịu hành động khiến cơ hội trôi qua.",
      study: "Lãng phí thời gian vào việc trì hoãn; cần bắt tay vào học ngay.",
      finance: "Đóng băng vốn ở chỗ không hiệu quả.",
      health: "Tránh nằm/ngồi một tư thế quá lâu gây trì trệ khí huyết.",
    },
  },
  Death: {
    tone: 0,
    essence:
      "Sự chuyển hóa triệt để: chấm dứt dứt khoát một chu kỳ đã hết sứ mệnh để sự sống mới được tái sinh.",
    symbols:
      "Kỵ sĩ xương cầm cờ hoa hồng trắng 5 cánh (sự thanh lọc và tái sinh), mặt trời đang mọc rạng rỡ giữa hai tòa tháp ở chân trời xa.",
    person:
      "Người quyết đoán cắt bỏ cái cũ, trải qua biến cố lớn và trưởng thành mạnh mẽ.",
    advice:
      "Hãy dũng cảm chấm dứt những gì đã hết giá trị — bình minh mới đang mọc ngay phía chân trời.",
    up: {
      general:
        "Một sự thay đổi sâu sắc và tất yếu. Điều gì không còn phù hợp sẽ rời đi để dọn chỗ cho một giai đoạn mới tốt đẹp hơn.",
      love:
        "Chuyển sang một giai đoạn mới sâu sắc hơn trong mối quan hệ, hoặc dứt khoát buông chuyện buồn cũ để mở lòng đón nhân duyên mới.",
      career:
        "Chuyển việc, kết thúc một dự án cũ hoặc tái cấu trúc hoàn toàn cách làm việc để bước sang giai đoạn mới.",
      study:
        "Từ bỏ lối học cũ không hiệu quả để lột xác với phương pháp mới.",
      finance:
        "Cắt bỏ các khoản chi/đầu tư thua lỗ để tập trung nguồn lực cho hướng mới.",
      health: "Từ bỏ thành công một thói quen xấu ảnh hưởng đến sức khỏe.",
    },
    rev: {
      general:
        "Sự sợ hãi thay đổi và cố níu kéo những điều đã qua khiến bạn mắc kẹt trong trạng thái mệt mỏi kéo dài.",
      love: "Dùng dằng chưa buông được chuyện cũ hoặc sợ bước tiếp.",
      career: "Ngại đổi mới dù môi trường hoặc công việc hiện tại đã bế tắc.",
      study: "Bảo thủ giữ cách làm cũ dù kết quả không cải thiện.",
      finance: "Chậm trễ trong việc cắt giảm các khoản chi lãng phí.",
      health:
        "Quá trình hồi phục chậm do chưa chịu thay đổi thói quen sinh hoạt.",
    },
  },
  Temperance: {
    tone: 2,
    essence:
      "Nghệ thuật dung hòa các mặt đối lập, sự điều độ, kiên nhẫn chữa lành và tìm ra điểm cân bằng vàng.",
    symbols:
      "Thiên thần một chân chạm nước (tiềm thức), một chân đứng trên đá (thực tại), rót dòng nước luân chuyển giữa hai chiếc cốc, hoa diên vỹ nở bên bờ suối.",
    person: "Người ôn hòa, điềm đạm, giỏi hòa giải và luôn giữ được sự bình tâm.",
    advice:
      "Kết hợp hài hòa các giải pháp và tiến từng bước điềm tĩnh, không cực đoan.",
    up: {
      general:
        "Sự bình yên, hài hòa và cân bằng quay trở lại. Các yếu tố tưởng như trái ngược nay kết hợp với nhau rất ăn ý.",
      love:
        "Mối quan hệ êm đềm, thấu hiểu, biết nhường nhịn và chữa lành những tổn thương cho nhau.",
      career:
        "Phối hợp nhịp nhàng giữa các phòng ban/đồng đội; cân bằng tốt giữa chất lượng chuyên môn và tiến độ.",
      study:
        "Kết hợp vừa học lý thuyết vừa thực hành điều độ mang lại hiệu quả bền vững.",
      finance: "Cân đối thu chi rất hợp lý, tài chính ổn định lâu dài.",
      health:
        "Trạng thái cơ thể và tinh thần cân bằng, phục hồi sức khỏe rất tốt.",
    },
    rev: {
      general:
        "Sự mất cân bằng, thái quá (làm quá sức hoặc buông thả), thiếu kiên nhẫn muốn đốt cháy giai đoạn.",
      love: "Lệch nhịp cảm xúc hoặc thiếu kiên nhẫn lắng nghe nhau.",
      career:
        "Làm việc quá tải dẫn đến căng thẳng hoặc xung đột nhóm do thiếu nhường nhịn.",
      study: "Học dồn ép sát ngày thi gây quá tải.",
      finance: "Chi tiêu mất cân đối với thu nhập.",
      health: "Thức khuya, sinh hoạt thất thường làm cơ thể mệt mỏi.",
    },
  },
  "The Devil": {
    tone: -2,
    essence:
      "Đối diện với vùng tối tâm lý: những cám dỗ, nỗi sợ, sự lệ thuộc hay thói quen xấu mà ta tự nguyện đeo vòng xích.",
    symbols:
      "Hai người bị xích dưới bệ đá nhưng vòng xích ở cổ rất rộng (họ có thể tự tháo ra bất cứ lúc nào nếu nhận thức được), ngọn đuốc chúc xuống.",
    person:
      "Người có sức hút mãnh liệt nhưng dễ kiểm soát, tính chiếm hữu cao hoặc đang bị áp lực vật chất/tham vọng chi phối.",
    advice:
      "Nhìn thẳng vào sợi dây đang trói buộc bạn (sự trì hoãn, nỗi sợ, mối quan hệ độc hại) và tự tay tháo nó ra.",
    up: {
      general:
        "Bạn có thể đang bị cuốn vào một thói quen tiêu cực, sự trì hoãn, ám ảnh công việc/vật chất hoặc một mối quan hệ gây kiệt sức.",
      love:
        "Sức hấp dẫn mạnh nhưng kèm theo sự ghen tuông, kiểm soát hoặc phụ thuộc cảm xúc cần được nhận diện tỉnh táo.",
      career:
        "Cảm giác bị trói buộc trong công việc áp lực cao chỉ vì thu nhập, hoặc gánh nặng nợ kỹ thuật/deadline.",
      study:
        "Bị cám dỗ bởi xao nhãng (mạng xã hội, game, trì hoãn) làm ảnh hưởng việc học.",
      finance:
        "Cẩn thận nợ nần, mua sắm quá đà hoặc các khoản lợi nhuận rủi ro cao.",
      health:
        "Cần cắt giảm các thói quen có hại như thức khuya, chất kích thích, căng thẳng.",
    },
    rev: {
      general:
        "Tin vui lớn: Bạn đang thức tỉnh, tháo bỏ xiềng xích ràng buộc và giành lại quyền tự chủ cho cuộc đời mình!",
      love:
        "Giải thoát khỏi mối quan hệ độc hại hoặc hóa giải được sự ghen tuông, kiểm soát.",
      career: "Thoát khỏi môi trường làm việc ngột ngạt, lấy lại động lực tự do.",
      study: "Chiến thắng sự lười biếng và trì hoãn để tập trung học tập.",
      finance: "Bắt đầu trả dần nợ và kiểm soát lại tài chính.",
      health: "Cai bỏ được thói quen xấu, tinh thần nhẹ nhõm.",
    },
  },
  "The Tower": {
    tone: -2,
    essence:
      "Tia chớp của sự thật đánh sập những cấu trúc giả tạo hoặc niềm tin sai lầm để giải phóng bạn về với nền tảng chân thật.",
    symbols:
      "Tia sét đánh trúng chiếc vương miện trên đỉnh tháp xây trên núi đá (sự kiêu ngạo/ảo tưởng bị phá vỡ), 22 tia lửa Yod tượng trưng cho sự thanh tẩy.",
    person:
      "Người tạo ra sự thay đổi đột ngột, thẳng thắn phơi bày sự thật hoặc đang trải qua bước ngoặt lớn.",
    advice:
      "Đừng cố giữ thứ đang sụp đổ; hãy để cái cũ tan đi để bạn xây lại trên nền đất thật vững chắc.",
    up: {
      general:
        "Một sự thay đổi đột ngột hoặc một sự thật sáng tỏ làm lung lay kế hoạch cũ. Dù gây bất ngờ, nó giúp bạn thoát khỏi lầm tưởng kéo dài.",
      love:
        "Những khúc mắc giấu kín bộc lộ ra ngoài; một cuộc nói chuyện thẳng thắn giúp làm rõ thực trạng mối quan hệ.",
      career:
        "Thay đổi bất ngờ trong tổ chức/dự án hoặc phát hiện lỗi lớn cần đập đi xây lại từ gốc.",
      study:
        "Nhận ra lỗ hổng lớn trong kiến thức kịp thời để thay đổi hoàn toàn cách ôn tập.",
      finance:
        "Cẩn trọng các khoản chi đột xuất; tránh đầu tư mạo hiểm lúc này.",
      health: "Chú ý nghỉ ngơi ngay khi cơ thể báo động quá tải.",
    },
    rev: {
      general:
        "Giảm nhẹ tác động của biến cố, hoặc bạn đang cố gắng trì hoãn một cuộc cải tổ vốn dĩ không thể tránh khỏi.",
      love:
        "Cố né tránh cuộc nói chuyện thẳng thắn chỉ làm căng thẳng âm ỉ lâu hơn.",
      career:
        "Chủ động sửa lỗi sớm sẽ giúp tránh được sự cố lớn khi vận hành.",
      study: "Kịp thời điều chỉnh lại đề tài/đồ án trước khi quá muộn.",
      finance: "Hạn chế được thiệt hại tài chính nhờ phản ứng nhanh.",
      health: "Cần giải tỏa áp lực tâm lý tích tụ.",
    },
  },
  "The Star": {
    tone: 2,
    essence:
      "Ánh sáng hy vọng trong trẻo, sự chữa lành dịu êm và niềm tin thuần khiết sau khi cơn bão đi qua.",
    symbols:
      "Ngôi sao 8 cánh lớn ở trung tâm bao quanh bởi 7 ngôi sao nhỏ (các luân xa/hy vọng dẫn lối), dòng nước tưới mát cả mặt đất lẫn hồ nước.",
    person:
      "Người truyền cảm hứng, lạc quan, chân thành và mang lại cảm giác bình yên cho mọi người.",
    advice:
      "Hãy tin tưởng vào tương lai và giữ vững ước mơ — bạn đang được dẫn lối đi đúng hướng.",
    up: {
      general:
        "Giai đoạn chữa lành, bình yên và tràn đầy cảm hứng sáng tạo. Những điều tốt đẹp và may mắn đang nhẹ nhàng đến với bạn.",
      love:
        "Tình cảm chân thành, trong sáng, chữa lành những vết thương cũ và cùng nhau hướng về tương lai tươi sáng.",
      career:
        "Cơ hội phát triển đúng định hướng mơ ước, xây dựng uy tín cá nhân tốt đẹp và nhận được sự quý mến từ cộng đồng.",
      study:
        "Lấy lại niềm hứng khởi học tập, đạt kết quả tốt và có cơ hội học bổng/vươn xa.",
      finance:
        "Tài chính dần hồi phục ổn định và có triển vọng dài hạn sáng sủa.",
      health:
        "Quá trình hồi phục sức khỏe và tinh thần diễn ra rất thuận lợi.",
    },
    rev: {
      general:
        "Tạm thời mất tự tin, bi quan hoặc cảm thấy ước mơ hơi xa vời thực tế.",
      love: "Kỳ vọng quá lý tưởng hóa dẫn đến hụt hẫng nhỏ.",
      career: "Tạm thời thiếu cảm hứng sáng tạo; cần nghỉ ngơi để nạp lại lửa.",
      study:
        "Hoài nghi năng lực bản thân (Impostor Syndrome) dù bạn hoàn toàn làm được.",
      finance:
        "Cần kế hoạch thực tế hơn để hiện thực hóa mục tiêu tài chính.",
      health: "Chú ý uống đủ nước và thư giãn tinh thần.",
    },
  },
  "The Moon": {
    tone: -1,
    essence:
      "Vùng sương mù của tiềm thức, những nỗi sợ vô hình, ảo giác và trực giác sâu thẳm khi chưa có ánh sáng rõ ràng.",
    symbols:
      "Mặt trăng tỏa 18 giọt sương, con tôm bò lên từ đáy nước (nỗi sợ nguyên thủy từ tiềm thức trồi lên), chó và sói tru dưới ánh trăng, con đường uốn lượn giữa hai tòa tháp.",
    person:
      "Người giàu trí tưởng tượng, nhạy cảm nhưng hiện tại đang bối rối hoặc chưa bộc lộ hết suy nghĩ thật.",
    advice:
      "Đừng vội kết luận hay sợ hãi những kịch bản do trí tưởng tượng vẽ ra; hãy kiên nhẫn chờ thông tin xác thực.",
    up: {
      general:
        "Tình huống còn nhiều điểm mờ mịt, chưa rõ trắng đen. Hãy cẩn thận với sự suy diễn quá mức (Overthinking) hoặc thông tin một chiều.",
      love:
        "Cảm giác bất an, hiểu lầm ngầm hoặc chưa nhìn rõ tâm ý thật sự của đối phương; cần trò chuyện nhẹ nhàng thay vì đoán già đoán non.",
      career:
        "Thông tin dự án/định hướng chưa rõ ràng; nên kiểm tra kỹ dữ liệu và điều khoản trước khi quyết định.",
      study:
        "Kiến thức còn mơ hồ, dễ nhầm lẫn các khái niệm gần giống nhau; cần hệ thống hóa lại.",
      finance:
        "Tuyệt đối tránh các khoản đầu tư mập mờ chưa rõ nguồn gốc.",
      health: "Giấc ngủ chập chờn hoặc lo âu; nên thư giãn trước khi ngủ.",
    },
    rev: {
      general:
        "Màn sương mù đang tan dần! Sự thật được làm sáng tỏ, những hiểu lầm và nỗi sợ vô cớ bắt đầu được giải tỏa.",
      love: "Tháo gỡ được hiểu lầm, nhìn rõ thực tế mối quan hệ.",
      career:
        "Tìm ra nguyên nhân lỗi ẩn (bug ngầm) và làm rõ quy trình làm việc.",
      study: "Hiểu thông suốt phần kiến thức trước đó từng thấy rối rắm.",
      finance: "Phát hiện và ngăn chặn kịp thời một khoản thất thoát.",
      health: "Tinh thần nhẹ nhõm hơn, giấc ngủ cải thiện.",
    },
  },
  "The Sun": {
    tone: 2,
    essence:
      "Ánh sáng rực rỡ của sự thật, niềm vui thuần khiết, sức sống dồi dào và thành công viên mãn không chút bóng tối.",
    symbols:
      "Mặt trời tỏa nắng rực rỡ, đứa trẻ cưỡi ngựa trắng không cần yên cương (sự tự do, trong sáng và tự tin tuyệt đối), những bông hoa hướng dương nở rộ.",
    person:
      "Người rạng rỡ, ấm áp, trung thực, tràn đầy năng lượng tích cực và luôn mang lại tiếng cười.",
    advice:
      "Tự tin tỏa sáng đúng giá trị của bản thân, đón nhận thành công và lan tỏa niềm vui của bạn.",
    up: {
      general:
        "Lá bài may mắn và tốt đẹp bậc nhất! Mọi khúc mắc đều sáng tỏ, mang lại thành công rực rỡ, niềm vui và sự lạc quan.",
      love:
        "Tình yêu ngập tràn tiếng cười, sự ấm áp, chân thành và minh bạch; rất dễ có tin vui lớn.",
      career:
        "Dự án thành công vang dội, được vinh danh, thăng tiến hoặc trúng tuyển vào vị trí mơ ước.",
      study: "Đạt điểm số xuất sắc, bảo vệ đồ án/thi cử vượt mong đợi.",
      finance: "Tài lộc dồi dào, đầu tư sinh lời rõ rệt.",
      health: "Sinh lực tràn trề, khỏe mạnh cả thể chất lẫn tinh thần.",
    },
    rev: {
      general:
        "Thành công và niềm vui vẫn đến nhưng có thể chậm hơn một chút, hoặc cái tôi quá lớn làm giảm đi sự trọn vẹn.",
      love: "Tình cảm vẫn tốt nhưng tránh trẻ con, hiếu thắng trong những chuyện nhỏ.",
      career:
        "Đạt kết quả tốt nhưng cần khiêm tốn và hoàn thiện nốt vài chi tiết nhỏ.",
      study: "Kết quả khả quan nhưng đừng chủ quan ở bước kiểm tra cuối.",
      finance: "Có lộc nhưng tránh tiêu xài phô trương.",
      health: "Chú ý chống nắng, giữ nhiệt độ cơ thể cân bằng.",
    },
  },
  Judgement: {
    tone: 2,
    essence:
      "Tiếng kèn thức tỉnh tâm thức: tổng kết toàn bộ hành trình đã qua, tự tha thứ và tái sinh ở một tầm cao mới.",
    symbols:
      "Thiên thần Gabriel thổi kèn từ tầng mây, những con người vươn dậy từ chiếc quan tài cũ với hai tay mở rộng đón nhận cuộc đời mới.",
    person:
      "Người có khả năng đánh giá sắc sảo, đang đứng trước quyết định chuyển mình lớn của cuộc đời.",
    advice:
      "Hãy lắng nghe tiếng gọi đam mê thật sự bên trong và bước lên nấc thang mới mà không ngoảnh lại tự trách chuyện cũ.",
    up: {
      general:
        "Thời khắc tổng kết và bước ngoặt thức tỉnh! Những nỗ lực bền bỉ của bạn được đền đáp và mở ra một giai đoạn sống đầy ý nghĩa.",
      love:
        "Làm rõ và nâng cấp mối quan hệ lên cam kết sâu sắc hơn, hoặc sự hàn gắn/tha thứ chân thành.",
      career:
        "Nhận kết quả đánh giá xuất sắc, thăng chức hoặc tìm thấy sứ mệnh nghề nghiệp đích thực.",
      study:
        "Nhận kết quả thi cử/tốt nghiệp xứng đáng với công sức đã bỏ ra.",
      finance:
        "Giải quyết dứt điểm các vấn đề tài chính cũ, mở ra cơ hội thu nhập mới.",
      health:
        "Phục hồi mạnh mẽ sau một giai đoạn điều trị hoặc thay đổi lối sống.",
    },
    rev: {
      general:
        "Sự tự phê bình quá khắt khe về lỗi lầm quá khứ, hoặc chần chừ không dám đáp lại cơ hội lớn đang vẫy gọi.",
      love: "Còn vương vấn trách móc chuyện cũ chưa chịu buông bỏ.",
      career:
        "Nghi ngờ bản thân nên ngần ngại chưa dám ứng tuyển vị trí cao hơn.",
      study: "Chưa rút ra kinh nghiệm từ các bài kiểm tra trước.",
      finance: "Trì hoãn việc quyết toán hoặc xử lý các khoản tồn đọng.",
      health: "Giải tỏa tâm lý tự trách để tinh thần nhẹ nhàng hơn.",
    },
  },
  "The World": {
    tone: 2,
    essence:
      "Sự hoàn thành viên mãn của một chu kỳ lớn, nơi mọi yếu tố hợp nhất trọn vẹn trước khi mở ra chân trời mới.",
    symbols:
      "Vòng nguyệt quế hình elip bao quanh vũ nữ đang múa tự do (sự viên mãn và cân bằng động), 4 sinh vật ở 4 góc nay đã hội tụ đầy đủ trong sự hài hòa tuyệt đối.",
    person:
      "Người thành đạt, có tầm nhìn quốc tế, hoàn thiện cả chuyên môn lẫn nhân cách.",
    advice:
      "Tự hào ăn mừng chặng đường đã hoàn tất trọn vẹn và sẵn sàng vươn ra biển lớn.",
    up: {
      general:
        "Đỉnh cao của sự hoàn thành và viên mãn! Mục tiêu lớn bạn theo đuổi bấy lâu đã đi đến cái kết trọn vẹn và đáng tự hào nhất.",
      love:
        "Tình yêu trọn vẹn, hạnh phúc viên mãn, đồng hành bền chặt hoặc tiến tới hôn nhân.",
      career:
        "Hoàn thành xuất sắc dự án lớn, đạt cột mốc sự nghiệp mơ ước, mở rộng cơ hội làm việc quốc tế.",
      study:
        "Tốt nghiệp thành công, hoàn tất đồ án/khóa học với kết quả mỹ mãn hoặc đi du học.",
      finance: "Đạt mục tiêu tài chính lớn, thu hoạch thành quả xứng đáng.",
      health: "Trạng thái khỏe mạnh, hài hòa toàn diện.",
    },
    rev: {
      general:
        "Đã đi được 95% quãng đường nhưng còn thiếu một bước hoàn tất cuối cùng (điểm kết) để thực sự khép lại chu kỳ.",
      love:
        "Cần giải quyết nốt một khúc mắc nhỏ để mối quan hệ thực sự trọn vẹn.",
      career:
        "Đừng làm qua loa bước nghiệm thu/bàn giao cuối cùng của dự án.",
      study:
        "Cố gắng hoàn thiện chỉn chu những trang cuối của đồ án/ôn tập.",
      finance: "Chờ hoàn tất thủ tục cuối trước khi nhận đủ khoản thu.",
      health: "Duy trì nốt liệu trình rèn luyện, đừng bỏ dở giữa chừng.",
    },
  },
};

const SUIT_META: Record<
  "WANDS" | "CUPS" | "SWORDS" | "PENTACLES",
  { viSuit: string; domain: string; symbolBase: string }
> = {
  WANDS: {
    viSuit: "Bộ Gậy (Lửa)",
    domain: "ý chí, đam mê, sáng tạo và hành động",
    symbolBase:
      "Những cây gậy gỗ nảy mầm lá xanh tượng trưng cho dòng chảy sinh lực và nhiệt huyết sống.",
  },
  CUPS: {
    viSuit: "Bộ Cốc (Nước)",
    domain: "cảm xúc, tình yêu, trực giác và sự gắn kết tâm hồn",
    symbolBase:
      "Những chiếc cốc vàng chứa đựng dòng nước của trái tim, tiềm thức và lòng trắc ẩn.",
  },
  SWORDS: {
    viSuit: "Bộ Kiếm (Khí)",
    domain: "tư duy logic, sự thật, quyết định và thử thách tinh thần",
    symbolBase:
      "Lưỡi kiếm hai lưỡi của trí tuệ: vừa có thể cắt đứt ảo tưởng để tìm sự thật, vừa có thể gây tổn thương nếu suy nghĩ cực đoan.",
  },
  PENTACLES: {
    viSuit: "Bộ Tiền/Xu (Đất)",
    domain:
      "tài chính, công việc thực tế, kỹ năng chuyên môn và giá trị bền vững",
    symbolBase:
      "Đồng xu khắc ngôi sao 5 cánh (Pentagram) biểu thị sự kết tinh của tinh thần vào thế giới vật chất hữu hình.",
  },
};

const RANK_ESSENCE: Record<number, string> = {
  1: "Hạt giống nguyên thủy thuần khiết nhất (Kether) — một cơ hội mới tinh khôi được trao tận tay.",
  2: "Sự phân cực và lựa chọn đầu tiên (Chokmah) — tìm kiếm sự cân bằng, kết nối hoặc định hướng giữa hai khả năng.",
  3: "Sự biểu hiện và phát triển bước đầu (Binah) — ý tưởng bắt đầu thành hình, có sự hợp tác hoặc trải nghiệm cảm xúc sâu.",
  4: "Nền tảng ổn định và cấu trúc vững chắc (Chesed) — củng cố thành quả, nghỉ ngơi nhưng tránh trì trệ.",
  5: "Điểm va chạm và thử thách thay đổi (Geburah) — bước ra khỏi sự an toàn để trưởng thành qua cọ xát.",
  6: "Sự hài hòa, phục hồi và chuyển giao tích cực (Tiphereth) — lấy lại cân bằng, sẻ chia và nhận sự công nhận.",
  7: "Đánh giá chiến lược và thử thách niềm tin (Netzach) — kiên định bảo vệ giá trị hoặc rà soát lại hướng đi.",
  8: "Sự vận động tập trung và làm chủ kỹ năng (Hod) — tăng tốc, rèn luyện chuyên sâu hoặc bứt khỏi giới hạn cũ.",
  9: "Độ chín muồi và tích lũy nội lực (Yesod) — thành tựu cá nhân, sức bền chặng cuối hoặc đối diện nỗi lo nội tâm.",
  10: "Sự viên mãn hoặc chạm ngưỡng tối đa của chu kỳ (Malkuth) — hoàn tất toàn bộ hành trình của nguyên tố để sang trang mới.",
  11: "Nhân vật Page (Học trò / Sứ giả): Tinh thần trẻ trung, ham học hỏi, mang đến tin tức mới hoặc cơ hội khởi đầu thực tế.",
  12: "Nhân vật Knight (Hiệp sĩ): Năng lượng hành động mạnh mẽ, sự dịch chuyển nhanh chóng và nhiệt huyết theo đuổi mục tiêu.",
  13: "Nhân vật Queen (Nữ hoàng): Sự trưởng thành nội tâm, làm chủ nguyên tố từ bên trong bằng sự thấu cảm và chiều sâu.",
  14: "Nhân vật King (Nhà vua): Bản lĩnh làm chủ hoàn toàn nguyên tố ra thế giới bên ngoài, năng lực lãnh đạo và trách nhiệm vững vàng.",
};

const MINOR_TONE: Record<
  "WANDS" | "CUPS" | "SWORDS" | "PENTACLES",
  Record<number, number>
> = {
  WANDS: {
    1: 2,
    2: 1,
    3: 2,
    4: 2,
    5: -1,
    6: 2,
    7: 1,
    8: 2,
    9: 0,
    10: -1,
    11: 1,
    12: 1,
    13: 2,
    14: 2,
  },
  CUPS: {
    1: 2,
    2: 2,
    3: 2,
    4: -1,
    5: -2,
    6: 2,
    7: 0,
    8: -1,
    9: 2,
    10: 2,
    11: 1,
    12: 2,
    13: 2,
    14: 2,
  },
  SWORDS: {
    1: 2,
    2: -1,
    3: -2,
    4: 0,
    5: -2,
    6: 1,
    7: -1,
    8: -2,
    9: -2,
    10: -2,
    11: 1,
    12: 0,
    13: 1,
    14: 2,
  },
  PENTACLES: {
    1: 2,
    2: 1,
    3: 2,
    4: 0,
    5: -2,
    6: 2,
    7: 1,
    8: 2,
    9: 2,
    10: 2,
    11: 1,
    12: 1,
    13: 2,
    14: 2,
  },
};

export const TAROT_MEANINGS: Record<string, TarotDeepMeaning> = {
  ...MAJOR_DEEP,
};

// Tự động xây dựng toàn bộ 56 lá Ẩn Phụ (Minor Arcana) từ FULL_TAROT_DECK
FULL_TAROT_DECK.forEach((card) => {
  if (card.arcana === "MAJOR" && TAROT_MEANINGS[card.name]) return;
  if (card.suit === "ARCANA_CORE") return;

  const sm = SUIT_META[card.suit] || SUIT_META.WANDS;
  const rankNumber = ((card.id - 22) % 14) + 1;
  const rankEss = RANK_ESSENCE[rankNumber] || "";
  const toneVal = MINOR_TONE[card.suit]?.[rankNumber] ?? 0;
  const kw0 = (card.keywordsUpright[0] || "").toLowerCase();
  const kw1 = (card.keywordsUpright[1] || "").toLowerCase();
  const rkw0 = (card.keywordsReversed[0] || "trì trệ").toLowerCase();
  const rkw1 = (card.keywordsReversed[1] || "lệch nhịp").toLowerCase();

  const isCourt = rankNumber >= 11;
  const personDesc = isCourt
    ? `${card.viName.split("—")[1]?.trim() || card.name}: Người mang đặc trưng của ${sm.viSuit} — nổi bật ở sự ${kw0} và ${kw1}.`
    : undefined;

  TAROT_MEANINGS[card.name] = {
    tone: toneVal,
    essence: `${rankEss} Đặt trong ${sm.viSuit}, lá bài phản chiếu trực tiếp ${sm.domain}.`,
    symbols: `${sm.symbolBase} Hình ảnh của ${card.name} nhấn mạnh trạng thái ${kw0} và ${kw1}.`,
    person: personDesc,
    advice: card.advice,
    up: {
      general: card.meaningUpright,
      love: `${card.meaningUpright} Năng lượng kết nối nổi bật qua sự ${kw0} và ${kw1}.`,
      career: `${card.meaningUpright} Trọng tâm công việc xoay quanh khả năng ${kw0} và ${kw1}.`,
      study: `Trọng tâm học tập và nghiên cứu nhấn mạnh vào sự ${kw0} cùng tư duy ${kw1}. ${card.meaningUpright}`,
      finance: `${card.meaningUpright} Dòng chảy nguồn lực đang gắn liền với trạng thái ${kw0}.`,
      health: `Giữ cân bằng nguồn sinh lực qua sự ${kw0} và ${kw1}. ${card.meaningUpright}`,
    },
    rev: {
      general: card.meaningReversed,
      love: `${card.meaningReversed} Chiều ngược cảnh báo trạng thái ${rkw0} và ${rkw1} trong mối quan hệ.`,
      career: `${card.meaningReversed} Chiều ngược chỉ ra nguy cơ ${rkw0} và ${rkw1} trong công việc.`,
      study: `${card.meaningReversed} Cần sớm khắc phục tình trạng ${rkw0} và ${rkw1}.`,
      finance: `${card.meaningReversed} Cẩn trọng trước rủi ro ${rkw0} hoặc ${rkw1} về nguồn lực.`,
      health: `Chú ý giải tỏa áp lực do trạng thái ${rkw0} và ${rkw1} kéo dài. ${card.meaningReversed}`,
    },
  };
});

/**
 * Tra cứu dữ liệu chuyên sâu của 1 lá bài theo tên
 */
export function getCardDeepMeaning(
  cardName: string
): TarotDeepMeaning | undefined {
  if (TAROT_MEANINGS[cardName]) return TAROT_MEANINGS[cardName];
  const lower = cardName.trim().toLowerCase();
  const key = Object.keys(TAROT_MEANINGS).find(
    (k) => k.toLowerCase() === lower || lower.includes(k.toLowerCase())
  );
  return key ? TAROT_MEANINGS[key] : undefined;
}

/**
 * Ánh xạ chủ đề hoặc câu hỏi của người dùng sang khía cạnh chuyên sâu tương ứng
 */
export function getDomainKeyFromTopic(
  topicOrQuestion: string
): keyof TarotDomainMeanings {
  const q = (topicOrQuestion || "").toLowerCase();
  if (
    q.includes("tình") ||
    q.includes("yêu") ||
    q.includes("người cũ") ||
    q.includes("hôn nhân") ||
    q.includes("kết nối") ||
    q.includes("love")
  ) {
    return "love";
  }
  if (
    q.includes("tiền") ||
    q.includes("tài chính") ||
    q.includes("đầu tư") ||
    q.includes("lương") ||
    q.includes("nợ") ||
    q.includes("kinh doanh") ||
    q.includes("finance")
  ) {
    return "finance";
  }
  if (
    q.includes("học") ||
    q.includes("thi") ||
    q.includes("đồ án") ||
    q.includes("luận văn") ||
    q.includes("trường") ||
    q.includes("study")
  ) {
    return "study";
  }
  if (
    q.includes("sức khỏe") ||
    q.includes("bệnh") ||
    q.includes("tinh thần") ||
    q.includes("ngủ") ||
    q.includes("health")
  ) {
    return "health";
  }
  if (
    q.includes("sự nghiệp") ||
    q.includes("công việc") ||
    q.includes("dự án") ||
    q.includes("nhảy việc") ||
    q.includes("career")
  ) {
    return "career";
  }
  return "general";
}
